import userModel from "@/models/users";
import { NextResponse } from "next/server";

//GET THE LIST OF USERS FOR ADMIN PAGE
export async function GET(request) {
  try {
    let getpage = request.nextUrl.searchParams.get("page") || 1;
    let keyword = request.nextUrl.searchParams.get("keyword") || '';

    var where = {}
    where.role = 0;

    const page = parseInt(getpage) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    let users, totalUsers;
    if (keyword) {
      users = await userModel.find({
        ...where,
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { email: { $regex: keyword, $options: 'i' } },
        ]
      }).skip(skip).limit(limit);

      totalUsers = await userModel.countDocuments({
        ...where,
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { email: { $regex: keyword, $options: 'i' } },
        ]
      })

    }
    else {
      totalUsers = await userModel.countDocuments(where);
      users = await userModel.find(where).skip(skip).limit(limit);
    }

    const totalPages = Math.ceil(totalUsers / limit);

    return NextResponse.json({ users, totalPages });
  } catch (error) {
    return NextResponse.json({ message: "Problem in fetching users", status: 500 });
  }
}

//DELETE SINGLE USER FROM ADMIN PAGE
export async function DELETE(request) {
  let id = request.nextUrl.searchParams.get("id");
  try {
    const result = await userModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted sucessfully", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete" }, { Error: error });
  }
}

export async function POST(request) {
  try {
      const users = await userModel.find();
      const jsonData = users.map((data, i) => (
          {
              "username": data.name,
              "useremail": data.email,
              "Phone Name": data.phone,
          }
      ));
      
      return NextResponse.json(jsonData);

} catch (error) {
  return NextResponse.json({ message: error.message })
}
}




