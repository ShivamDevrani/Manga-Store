const mongoose=require('mongoose');


const orderSchema=new mongoose.Schema({
    mangaId:{
        type:mongoose.Schema.ObjectId,
        ref:'Manga',
        required:true,
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    } ,
    payment:{
        type:String,
        enum: ['UPI','COD'],
        default:'UPI'
    },
 quantity: {
        type: Number,
        default:1
    },
    date:{
        type:Date,
         default:Date.now
    },
    cost:{
        type:Number, 
    }
})

const Order=mongoose.model('Order',orderSchema);

module.exports=Order;

