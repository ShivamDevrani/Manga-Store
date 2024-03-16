const mongoose=require('mongoose');


const cartSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required: true
    },
    mangaName: {
        type: String,
        required: true
    },
    mangaId: {
        type: mongoose.Schema.ObjectId,
        ref:'Manga',
        required: true
    },
    mangaPrice: {
        type: Number,
        required: true
    }
})

const Cart=mongoose.model('Cart',cartSchema);
module.exports=Cart;