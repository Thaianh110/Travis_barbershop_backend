const mongoose = require("mongoose");
 const orderSchema = new mongoose.Schema(
    {
        orderItem: [
            {
                name:{type: String,require:true},
                amount:{type: Number, require:true},
                image:{type: String, require:true},
                price:{type:String, require:true},
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    require: true,
                },
            },
        ],

        shippingAddress: {
            fullName: {type: String,require:true},
            address:{type: String, require:true},
            city:{type:String,require:true},
            country:{type: String,require:true},
            phone:{type: Number, require:true},
        },
        paymentMethod:{type:String,require:true},
        itemsPrice:{type:Number, require:true},
        shippingPrice:{type: Number,require:true},
        thuePrice:{type: Number,require:true},
        totalPrice:{type: Number,require:true},
        user : {type: mongoose.Schema.Types.ObjectId, ref:'User',require:true},
        isPaid:{type: Boolean,default:false},
        paidTime:{type:Date},
        isDelivered: {type:Boolean,default: false},
        deliveredTime:{type:Date},
    },
    {
        timestamps:true,
    }

 );
 const Order = mongoose.Model('Order',orderSchema);
 module.exports = Order ;
