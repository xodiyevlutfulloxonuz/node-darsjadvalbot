const mongoose=require('mongoose')
require('dotenv').config()

async function connectDb(){
    console.log('mongodb connected')
    await  mongoose.connect(process.env.MONGO_URL_1,{
        useNewUrlParser:true
    })
}

const createSchema = new mongoose.Schema({
  telegram_Id:{
      type:String
  },
  dushanba:{
      type:Array
  },
  seshanba:{
      type:Array
  },
  chorshanba:{
      type:Array
  },
  payshanba:{
      type:Array
  },
  juma:{
      type:Array
  },
  shanba:{
      type:Array
  }


})
const connectModel=mongoose.model('tdtus',createSchema)

module.exports={
    connectDb,
    connectModel
}