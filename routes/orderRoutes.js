const express=require('express');

const router=express.Router();

const Order=require('../models/orderSchema');

const Manga=require('../models/mangaSchema');

const {jwtAuthMiddleware}=require('../jwt');



router.get('/manga',jwtAuthMiddleware,async (req,res)=>{
    const id=req.user.id;
    try{
      const order=await Order.find({userId:id});

      console.log('order list fetched succesfully');

      order.sort((a,b)=>{
        return b.date-a.date;
      })
      res.status(200).json(order);
    
    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})


// to get order place user have to specify two things in req body-->quantity,payment method
router.post('/manga/:id',jwtAuthMiddleware,async (req,res)=>{
  const {quantity,payment}=req.body;
  const id=req.params.id;
  try{
     const manga=await Manga.findById(id);
    

     const cost = quantity * manga.mangaPrice;

     const order=new Order({
      mangaId:id,
      userId:req.user.id,
      quantity:quantity,
      payment:payment,
      cost:cost,
      date:new Date()
     })

     await order.save();
     manga.purchasedCount=manga.purchasedCount+quantity;
     await manga.save();
     console.log('your order placed successfully');

     res.status(200).json(order);
  }catch(err)
  {
      console.log(err);
      res.status(500).json({error:'internal server error'});
  }

})

module.exports=router;