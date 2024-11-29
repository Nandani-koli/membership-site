import orderModel from "@/models/orders";
import exportToCsv from "@/utils/exportToCsv";
import { NextResponse } from "next/server";
import parser from "papaparse";

export async function GET(request) {
    let getpage = request.nextUrl.searchParams.get("page") || 1;
    let keyword = request.nextUrl.searchParams.get("keyword") || '';

    try {
        const page = parseInt(getpage) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        let orderlist, totalorders;
        if (keyword) {
            orderlist = await orderModel.find(
                {
                    $or: [
                        { invoiceNumber: { $regex: keyword, $options: 'i' } },
                        { orderName: { $regex: keyword, $options: 'i' } },
                        { "shippingDetails.name": { $regex: keyword, $options: 'i' } },
                    ]
                }
            ).populate('userId').skip(skip).limit(limit);

            totalorders = await orderModel.countDocuments();
        }
        else {
            orderlist = await orderModel.find().populate('userId').skip(skip).limit(limit);

            totalorders = await orderModel.countDocuments();
        }

        let totalPages = Math.ceil(totalorders / limit);

        return NextResponse.json({ orderlist, totalPages })

    } catch (error) {
        
        return NextResponse.json({ message: error.message })
    }
}

export async function POST(request) {
    try {
        const orders = await orderModel.find().populate('userId');
        const jsonData = orders.map((data, i) => (
            {
                "username": data.shippingDetails.name,
                "useremail": data.userId.email,
                "Plan Name": data.orderName,
                "Invoice Number": data.invoiceNumber,
                "Date of payment": data.paymentDate
            }
        ));
        return NextResponse.json(jsonData);

} catch (error) {
    return NextResponse.json({ message: error.message })
}
}