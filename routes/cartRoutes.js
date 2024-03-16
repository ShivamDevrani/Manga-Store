const express=require('express');

const router=express.Router();

const User=require('../models/userSchema');


const Manga=require('../models/mangaSchema');


const Cart=require('../models/cartSchema');


const {jwtAuthMiddleware}=require('../jwt');

//get cart

router.get('/user',jwtAuthMiddleware,async (req,res)=>{
     const userId=req.user.id;
     
     try{
        const cart= await Cart.find({userId});

        console.log('fetched successfully');
        res.status(200).json(cart);
        
     }
     catch(err)
     {
        console.log(err);
        res.status(500).json({error:"internal server error"});
     }
})


// add the manga to the cart
router.post('/user/:id', jwtAuthMiddleware, async (req, res) => {
    const mangaId = req.params.id;
    const userId = req.user.id;
    
    try {
        // Check if the manga is already added to the user's cart
        const existingCartItem = await Cart.findOne({ userId, mangaId });

        if (existingCartItem) {
            return res.status(400).json({ error: "Item already added to cart" });
        }

        // Fetch manga details
        const manga = await Manga.findById(mangaId);

        // Create a new cart item
        const cartItem = new Cart({
            userId: userId,
            mangaName: manga.mangaName,
            mangaId: mangaId,
            mangaPrice: manga.mangaPrice
        });

        // Save the cart item
        await cartItem.save();

        console.log('Item added to cart');
        res.status(200).json(manga); // Return the manga object if needed

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});



router.delete('/user/:id', jwtAuthMiddleware, async (req, res) => {
    const mangaId = req.params.id;
    const userId = req.user.id;

    try {
        // Find the cart item to delete
        const cart= await Cart.findOneAndDelete({ userId, mangaId });

        console.log('Manga deleted from cart');
        res.status(200).json(cart);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports=router;