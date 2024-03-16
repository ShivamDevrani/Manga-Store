const express=require('express');

const router=express.Router();

const User=require('../models/userSchema');

const Manga=require('../models/mangaSchema');

const {jwtAuthMiddleware,generateToken}=require('../jwt');

//user authentication

//signup

router.post('/signup',async (req,res)=>{
    try{
      const data=req.body;
      //another user after admin cannot enter as admin
      if(data.role==='admin')
      {
          const findadmin=await User.findOne({role:'admin'});
          if(findadmin)
          return res.json({response:"you are not authorised to be admin"});
      }

      const newuser=new User(data);

      const response=await newuser.save();

      const payload={
           id:response.id,
           role:response.role
      }
      const token=generateToken(payload);
      console.log("signup successfully");
      res.status(200).json({response:response,token:token});

    }
    catch(err){
      console.log(err);
      res.status(500).json({error:"internal server error"});
    }
})

//login
router.post('/login',async (req,res)=>{

    const {email,password}=req.body;

    try{

      const user=await User.findOne({email:email});
      if(!user)
      return res.status(401).json({error:'wrong email'});
      
      const iscompare= user.comparePassword(password);

      if(!iscompare) return res.status(401).json({error:'wrong password'});

        const payload={
            id:user.id,
            role:user.role
       }
     
       const token=generateToken(payload);

       console.log('login successfully');

       res.status(200).json({token:token});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

// user profile

router.get('/profile',jwtAuthMiddleware, async (req,res)=>{

    const userId=req.user.id;
    try{
        
       const user=await User.findById(userId).select('id name email address password');
       console.log('id fetched');
       res.status(200).json(user);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})

//change the password
router.put('/profile/password',jwtAuthMiddleware,async (req,res)=>{

    const userId=req.user.id;
    try{
        const {currentPassword,newPassword}=req.body;

        const user=await User.findById(userId);
        
        const ismatch=user.comparePassword(currentPassword);

        if(!ismatch) return res.status(400).json({error:'current password is incorrect'});
        
        user.password=newPassword;

        await user.save();
        
        res.status(200).json({repsonse:"password successfully updated"});

    }catch(err){
         console.log(err);
         res.status(500).json({error:"internal server error"});
    }
    
})

// Update user profile address and name
router.put('/profile',jwtAuthMiddleware, async (req, res) => {
    const userId = req.user.id;
    try {
        const { name, address} = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update name and address if provided in the request body
        if (name) {
            user.name = name;
        }
        if (address) {
            user.address = address;
        }
        
        await user.save();

        res.status(200).json({ response: "Profile updated successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});


// manga section
//get manga user query string ?mangaName=____?mangaAuthor____?genre=_____
router.get('/manga',async (req,res)=>{
    const mangaName=req.query.mangaName;
    const mangaAuthor=req.query.mangaAuthor;
    const mangaGenre=req.query.mangaGenre;
    try{
        const query={};
        if (mangaName) query.mangaName = mangaName;
        if (mangaAuthor) query.mangaAuthor = mangaAuthor;
       
        if (mangaGenre) {
            // If mangaGenre is provided, split it by comma to handle multiple genres
            const genres = mangaGenre.split(',');
            // Add mangaGenre to the query using the $in operator to match any of the specified genres
            query.mangaGenre = { $in: genres };
        }
       
            const manga=await Manga.find(query).select('id mangaName mangaPrice authorName mangaGenre');
            console.log('fetched successfully');
            res.status(200).json(manga);
        }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }

})


//get a particular manga details
router.get('/manga/:id',async (req,res)=>{
    const id=req.params.id;
    try{
        
        const manga=await Manga.findById(id);
        if(!manga)
        res.status(404).json('manga not found');

        res.status(200).json(manga);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:'internal server error'});

    }
})

//write a review in a manga 
router.post('/manga/:id',jwtAuthMiddleware,async (req,res)=>{
    const {rating,comment}=req.body
    const mangaId=req.params.id;
    const userId=req.user.id;
    try{
        if (!rating || !comment) {
            return res.status(400).json({ error: 'Rating and comment are required.' });
        }
        const manga=await Manga.findById(mangaId);

       manga.mangaReviews.push({rating,comment,userId});

       await manga.save();
       console.log("added your review");
       res.status(200).json(manga.mangaReviews);

    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:'internal server error'});

    }
})

module.exports=router;