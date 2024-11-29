import mongoose from "mongoose";

export default async function connectToDatabase() {
    const uri = process.env.db_URL;

   try {
    await mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to db")
   } catch (error) {
    console.log(error);
    throw error;
   }
}