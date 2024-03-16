const express = require('express');
const { jwtAuthMiddleware } = require('../jwt');

const User = require('../models/userSchema');

const Manga = require('../models/mangaSchema');

const router = express.Router();

router.post('/manga', jwtAuthMiddleware, async (req, res) => {

    try {
        if (req.user.role !== 'admin')
            return res.status(401).json({ error: 'you are not authorised' });

        const data = req.body;
        const manga = new Manga(data);

        await manga.save();

        console.log('manga uploaded successfully');
        res.status(200).json(manga);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }

})

//update the manga details
router.put('/manga/:id',jwtAuthMiddleware, async (req, res) => {
    try {
        const id=req.params.id;
        if (req.user.role !== 'admin')
        return res.status(401).json({ error: 'you are not authorised' });
        
        const datatoUpdate=req.body;

        const manga=await Manga.findByIdAndUpdate(id,datatoUpdate,{new:true});

        console.log('manga updated succesfully');

        res.status(200).json(manga);


    } catch (err) {
        
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})

//delete the manga
router.delete('/manga/:id',jwtAuthMiddleware, async (req, res) => {
    try {
        const id=req.params.id;
        if (req.user.role !== 'admin')
        return res.status(401).json({ error: 'you are not authorised' });
        
        const manga=await Manga.findByIdAndDelete(id);

        console.log('manga deleted succesfully');

        res.status(200).json(manga);


    } catch (err) {
        
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})

module.exports=router;