import userModel from "@/models/users";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'

export async function POST(request) {

    let { email, password } = await request.json();
    try {
        let user = await userModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Invalid credentials", status: 401 })
        }
        const checkpass = await bcrypt.compare(password, user.password);
        if (!checkpass) {
            return NextResponse.json({ message: "Invalid credentials", status: 401 })
        }
        else {
            const userInfo = {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                isVerified : user.IsVerified,
                subscriptionlevel : user.subscriptionLevel,
            }
            const secret = process.env.SECRET_KEY;
            const accessToken = jwt.sign(userInfo, secret, { expiresIn: '1m' });

            const result = {
                userInfo,
                accessToken,
            };

            return NextResponse.json({ message: "Login Successful", status: 200, data: result })
        }

    } catch (error) {
        return NextResponse.json({ message: error.message , status: 500 })
    }
}