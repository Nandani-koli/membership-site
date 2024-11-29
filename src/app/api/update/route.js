import userModel from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { writeFile } from 'fs/promises'
import cloudinary from "@/utils/cloudinary";
import { unlinkSync } from 'fs';

// EDIT/UPDATE USER DETAILS FROM BOTH ADMIN AND USER ROUTE
export async function PUT(request) {

    try {
      let id = request.nextUrl.searchParams.get("id");
  
      const updateddata = await request.json();
      var hashpass;
      if (updateddata.password) {
        hashpass = await bcrypt.hash(updateddata.password, 10);
      }
      updateddata.password = hashpass;
  
      const updatedUser = await userModel.findByIdAndUpdate(id,
        { $set: updateddata }, { new: true });
  
      return NextResponse.json({ status: 200, message: 'User details updated', user: updatedUser });
  
    } catch (error) {
      return NextResponse.json({ status: 500, message: 'Error updating user details' });
    }
  }
  
  // UPLOAD PROFILE PICTURE FROM BOTH ADMIN AND USER ROUTE
  
  // Disclaimer :- THIS CODE CONTAINES ISSUES IT DOESN'T SUPPORT LARGE IMAGE SIZE IT WILL GIVE SERVER ERROR
  
  export async function POST(request) {
  
    try {
      const data = await request.formData();
      const file = data.get('file');
  
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
  
      const filename = file.name + '-' + Date.now();
  
      const uploadPath = `public/uploads/${filename}`
      await writeFile(uploadPath, buffer);
   
      const uploadResult = await cloudinary.uploader.upload(uploadPath, {
        public_id: filename,
        folder: 'profilePitcures', 
      });
  
      unlinkSync(uploadPath);
  
      let id = request.nextUrl.searchParams.get("id");
      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { $set: { image: uploadResult.secure_url } },
        { new: true }
      );
  
      return NextResponse.json({
        success: true,
        message: 'File uploaded successfully',
        user: updatedUser,
      });
    }
    catch (error) {
      return NextResponse.json({ success: false, message: 'Error updating user image' });
    }
  }