import { NextResponse } from "next/server";
import Stripe from "stripe"
import orderModel from "@/models/orders";
import userModel from "@/models/users";
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import sendEmail from "@/utils/mailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
    try {

        const id = request.nextUrl.searchParams.get('orderid');

        let orderdetails = await orderModel.findOne({ '_id': id });

        return NextResponse.json({ orderdetails });

    } catch (error) {
        return NextResponse.json({ message: error.message })
    }
}

export async function PUT(request) {
    try {

        const sessionid = request.nextUrl.searchParams.get('session_id');

        const session = await stripe.checkout.sessions.retrieve(sessionid);
        const invoice = await stripe.invoices.retrieve(session.invoice);

        const user = await userModel.findOne({'email' : invoice.customer_email});
        var id ;
        if(user)
        {
            id = user._id;
        }else{
            let password = `${invoice.customer_name}123`;
            let hashpass = await bcrypt.hash(password, 10);
            let newuser = {
                name : invoice.customer_name,
                email : invoice.customer_email,
                password : hashpass,
                phone : invoice.customer_phone
            }
            let saveduser = await userModel.create(newuser);
            id = saveduser._id;
            let email = saveduser.email;

            await sendEmail({email,emailType :'PASS',userId : password});
        }

        const invoicelink = invoice.hosted_invoice_url;
        const invoicepdf = invoice.invoice_pdf;

        const planName = invoice.lines.data[0].description;

        const pi_id = invoice.payment_intent;
        const piStatus = await stripe.paymentIntents.retrieve(pi_id);

        const pmid = piStatus.payment_method;
        const pmdetails = await stripe.paymentMethods.retrieve(pmid);

        const status = invoice.status_transitions.paid_at;
        let date = new Date(status * 1000);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        date = day + `-` + month + `-` + year;


        let order = await orderModel.findOne({ invoiceNumber: invoice.number })
        if (order) {
            return NextResponse.json({ status: piStatus.status, orderid: order._id });
        }

        //save order details in database 
        let lineaddress = invoice.customer_address.line1 + `,` + invoice.customer_address.line2;

        let neworder = {
            orderName: planName,
            price: invoice.amount_paid / 100,
            invoiceNumber: invoice.number,
            shippingDetails: {
                address: {
                    line: lineaddress,
                    city: invoice.customer_address.city,
                    postal_code: invoice.customer_address.postal_code,
                    state: invoice.customer_address.state,
                    country: invoice.customer_address.country
                },
                name: invoice.customer_name,
                phone: invoice.customer_phone,
            },
            email : invoice.customer_email,
            paymentDate: date,
            card: {
                brand: pmdetails.card.brand,
                lastdigits: pmdetails.card.last4,
            },
            userId: id,
        }

        let savededorder = await orderModel.create(neworder);

        let subscription = 0;
        if (savededorder.orderName == 'Basic Plan')
            subscription = 1;
        else if (savededorder.orderName == 'Plus Plan')
            subscription = 2;
        else if (savededorder.orderName == 'Pro Plan')
            subscription = 3;

        await userModel.findByIdAndUpdate(id,
            {
                $push: { orders: savededorder._id },
                $set: { subscriptionLevel: subscription }
            }, { new: true });

        //send mail to user 
        let transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f74f850032e207",
                pass: "b308f029ed2589"
            }
        });

        const mailData = {
            from: process.env.NODEMAILER_EMAIL,
            to: invoice.customer_email,
            subject: "Confirmation for sucessful payment",
            html: `<h3>Dear Customer,<h3>
            <h4>Thank you, your payment has been successfully received. </h4>
            <p style = "color : red">Please Note :- Below link will be expire after 30 days</p>
            Click <a href=${invoicelink}>here</a> to get your payment receipt <br/> Or <br/> Click <a href =${invoicepdf}>here</a> to download pdf        
            <h1 >Order Details</h1>
            <div >
              <div >
                <div >
                  <h3>Billed To:</h3>
                  <h3 >${savededorder.shippingDetails.name}</h3>
                  <p >${savededorder.shippingDetails.address.line}</p>
                  <p >${savededorder.shippingDetails.address.city + ` ` + savededorder.shippingDetails.address.postal_code}</p>
                  <p >${savededorder.shippingDetails.address.state + `,` + savededorder.shippingDetails.address.country}</p>
                </div>
                <p>${savededorder.shippingDetails.phone}</p>
              </div>
              <div>
                <div >Invoice #${savededorder.invoiceNumber}
                <span> Status :- Paid</span>
                  <p >Date Paid :- ${savededorder.paymentDate}</p>
                  <p>Payment Method :- ${savededorder.card.brand + `-` + savededorder.card.lastdigits}</p>
                </div>
                <br />
              </div>
            </div>

            <div >
            <p>${savededorder.orderName}</p>
            </div>
              <div>
                <p>Total: &#x20B9; ${savededorder.price}.00
                </p>
              </div>`
            ,
        }

        await transport.sendMail(mailData);

        return NextResponse.json({ status: piStatus.status, orderid: savededorder._id });

    } catch (error) {
        return NextResponse.json(error.message);
    }

}

export async function POST(request) {

    try {
        const data = await request.json();
        const amt = data.price;

        const checkoutsession = await stripe.checkout.sessions.create({
            invoice_creation: {
                enabled: true,
            },
            line_items: [
                {
                    price: amt,
                    quantity: 1,
                },
            ],
            shipping_address_collection: {
                allowed_countries: ['IN', 'US'],
            },
            phone_number_collection: {
                enabled: true
            },
            mode: 'payment',
            success_url: `http://localhost:3000/member/orderSuccess?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/member/?canceled=true`,

        });

        return NextResponse.json({ result: checkoutsession.url });
    } catch (error) {
        return NextResponse.json({ message: error });
    }
}


