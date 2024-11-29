import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    image : {
        type : String
    },
    role : {
        type : Number,
        default : 0     //0 for user , 1 for admin
    },
    documents : {
        type : [String],
    },
    IsVerified : {
        type : Boolean,
        default : false,
    },
    subscriptionLevel : {
        type : Number,
        default : 0 //0 for no-subscription , 1 for Basic plan, 2 for plus plan and 3 for pro plan
    },
    orders : [{
        type : mongoose.Types.ObjectId,
        ref : "orders",
    }],
    verifyToken : String,
    verifyTokenExpiry : Date,
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
})

const userModel = mongoose.models.users || mongoose.model('users',userSchema);

export default userModel;

