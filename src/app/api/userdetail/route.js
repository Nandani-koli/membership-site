import { writeFile } from 'fs/promises'
import { unlinkSync } from 'fs';
import userModel from "@/models/users";
import { NextResponse } from "next/server";
import jwtDecode from "jwt-decode";
import cloudinary from "@/utils/cloudinary";

//upload documents 
export async function POST(request) {
  try {

    let token = request.cookies.get('token')?.value || '';
    let tokendata = jwtDecode(token);
    let id = tokendata.id;

    const data = await request.formData();
    const files = data.getAll('files');

    const allfiles = files.map(async (file) => {
      
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = file.name + '-' + Date.now();
    
      const uploadPath = `public/documents/${filename}`;
      await writeFile(uploadPath, buffer);

      const uploadResult = await cloudinary.uploader.upload(uploadPath, {
        public_id: filename,
        folder: 'documents', 
      });

      unlinkSync(uploadPath);

      // return secureUrl;
      return uploadResult.secure_url;
    });

    const uploadedFiles = await Promise.all(allfiles);

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: { documents: uploadedFiles } },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Files uploaded successfully',
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error uploading user documents' });
  }
}

//GET FULL DETAILS OF SINGLE USER
export async function GET(request) {
    try {

        let userid = request.nextUrl.searchParams.get("id");

        const user = await userModel.findOne({ '_id': userid });

        const userinfo = {
            id: user._id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            password : user.password,
            role: user.role,
            image : user.image,
            documents : user.documents,
            IsVerified : user.IsVerified,
            orders : user.orders,
            subscriptionlevel : user.subscriptionLevel
        }
        return NextResponse.json({ data: userinfo,status: 200 });
        
    } catch (error) {
        return NextResponse.json({"error" : error, status : 401})
    }
}

