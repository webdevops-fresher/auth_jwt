const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});


const users=require('./routes/users');
const auth=require('./routes/auth');
const app=express();
app.use(cors());
app.use(express.json());


//mongodb atlas connection
const DB=process.env.DATABASE;
mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true})
.then(connection=>console.log('connected to db mernshopping in mongodb atlas'))
.catch(err=>console.log('db connection error'));


//routes
app.use('/api/users',users);
app.use('/api/auth',auth);

//port 
app.listen(process.env.PORT,()=>console.log(`server listening @PORT${process.env.PORT}`));
