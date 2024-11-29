import imageModel from "@/models/imagegallery";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import jwtDecode from "jwt-decode";
import cloudinary from "@/utils/cloudinary";
import { unlinkSync } from 'fs';

// upload images 
export async function POST(request) {
    try {
        let token = request.cookies.get('token')?.value || '';
        let tokendata = jwtDecode(token);
        let id = tokendata.id;

        const data = await request.formData();
        const file = data.get('image');

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filename = file.name + '-' + Date.now();

        const uploadPath = `public/uploads/${filename}`
        await writeFile(uploadPath, buffer);

        const uploadResult = await cloudinary.uploader.upload(uploadPath, {
            public_id: filename,
            folder: 'Gallery',
        });

        unlinkSync(uploadPath);

        let newdata = {
            userId: id,
            image: uploadResult.secure_url
        }

        await imageModel.create(newdata);

        return NextResponse.json({ message: "Image Uploaded", success: true })

    } catch (error) {

        return NextResponse.json({ message: error.message, success: false });
    }
}

//get user image 

export async function GET(request) {
    try {
        let token = request.cookies.get('token')?.value || '';
        let tokendata = jwtDecode(token);
        let id = tokendata.id;
       
        let getpage = request.nextUrl.searchParams.get("page") || 1;
        const page = parseInt(getpage) || 1;
        const limit = 4;
        const skip = (page - 1) * limit;

        let where = {};
        where.userId = id;

        let totalImages = await imageModel.countDocuments(where);
        let images = await imageModel.find(where).skip(skip).limit(limit);

        const totalPages = Math.ceil(totalImages / limit);

        return NextResponse.json({ images,totalPages, success: true })


    } catch (error) {
        return NextResponse.json({ message: error.message, success: false })
    }
}