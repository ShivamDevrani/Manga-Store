const express=require('express');
const app=express();

require('dotenv').config();

const userRoutes=require('./routes/userRoutes');
const adminRoutes=require('./routes/adminRoutes');
const cartRoutes=require('./routes/cartRoutes');
const orderRoutes=require('./routes/orderRoutes');


const db=require('./db');


const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/user',userRoutes);
app.use('/admin',adminRoutes);
app.use('/cart',cartRoutes);
app.use('/order',orderRoutes);



const PORT=process.env.PORT||4000;
app.listen(PORT,()=>{
    console.log("server is connected");
})