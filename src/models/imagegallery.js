import mongoose, { mongo } from "mongoose";

const imageSchema = new mongoose.Schema({
    userId : mongoose.Types.ObjectId,
    image : String
})

const imageModel = mongoose.models.images || mongoose.model('images', imageSchema);

export default imageModel ;
