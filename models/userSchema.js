const mongoose=require('mongoose');

const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
      
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: function(value) {
              // Regular expression for email validation
              return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
          }
        
    },
    address:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'  
    }
  
});


userSchema.pre('save',async function(next){

    const user=this;

    if(!user.isModified('password')) return next();

    try{
        //hash password generation
        const salt=await bcrypt.genSalt(10);

        const hashedPassword=await bcrypt.hash(user.password,salt);

        user.password=hashedPassword;

        next();
    }
    catch(err)
    {
         console.log(err);
         next(err);
    }


});


userSchema.methods.comparePassword=async function(userPassword){
    try{
        const ismatch=await bcrypt.compare(userPassword,this.password);
        return ismatch;

    }catch(err){
        throw err;
    }
}



const User=mongoose.model('User',userSchema);
module.exports=User;

