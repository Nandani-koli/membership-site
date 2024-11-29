import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    orderName : String,

    price : Number,

    invoiceNumber : String,
    
    shippingDetails : {
        address : {
            line : String,
            city : String,
            postal_code : String,
            state : String,
            country : String
        },
        name : String,
        phone : String
    },

    email : String,
    
    paymentDate : String,
    
    card : {
        brand : String,
        lastdigits : Number
    },

    userId : {
        type : mongoose.Types.ObjectId,
        ref : "users"
    },
})

const orderModel = mongoose.models.orders || mongoose.model('orders',orderSchema);

export default orderModel;