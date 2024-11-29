import userModel from "@/models/users";
import sendEmail from "@/utils/mailer";
import jwtDecode from "jwt-decode";
import { NextResponse } from "next/server";

export async function POST(request)
{
    const reqbody = await request.json();
    const {token} = reqbody;

    try {

        let user = await userModel.findOne({'verifyToken' : token, 'verifyTokenExpiry' : {
            $gt : Date.now()
        }})
        
        if(!user)
        {
            return NextResponse.json({message : 'Invalid User token', status : 498 });
        }

        user.IsVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();
       
        return NextResponse.json({message : 'Email Verified Sucessfully',status : 200});
        
    } catch (error) {
        return NextResponse.json({message : error.message, status : 500})
    }
}

export async function GET(request)
{
    let token = request.cookies.get('token')?.value || '';
    let tokeninfo = jwtDecode(token);

    let email = tokeninfo.email;
    let id = tokeninfo.id;

    try {

        await sendEmail({email,emailType : 'VERIFY',userId : id});

        return NextResponse.json({message : "Verification mail has been sent, Check Inbox"});
    } catch (error) {
        return NextResponse.json({message : error.message});
    }
}

