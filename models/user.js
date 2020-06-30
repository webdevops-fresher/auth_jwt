const mongoose=require('mongoose');
const schema=mongoose.Schema;

const userSchema=new schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
});

module.exports=userModel=mongoose.model('userModel',userSchema);
