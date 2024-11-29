import { NextResponse } from "next/server";
import userModel from "@/models/users";
import jwtDecode from "jwt-decode";

export async function GET(request)
{
    const token = request.cookies.get('token')?.value || '';
    const tokendata = jwtDecode(token);
    try {
        const orders = await userModel.findOne({'_id' : tokendata.id}).populate('orders');
        return NextResponse.json(orders);

    } catch (error) {
        return NextResponse.json({message : error.message})
    }
}