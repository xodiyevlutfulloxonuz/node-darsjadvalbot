
const {connectModel}=require('./db')

//DUSHANBA KUN UCHUN FUNKSIYA //
async  function duFunction(chat_id){
    try {
        let user =await connectModel.findOne({telegram_Id:chat_id})
    if(user.dushanba.length){
        return true
    }
    else{
        return false 
    }
    } catch (error) {
        console.log(error+"");
    }
}
//DUSHANBA KUN UCHUN FUNKSIYA //

//SESHANBA KUN UCHUN FUNKSIYA//
async  function seFunction(chat_id){
    try {
        let user =await connectModel.findOne({telegram_Id:chat_id})
    if(user.seshanba.length){
        return true
    }
    else{
        return false 
    }
    } catch (error) {
        console.log(error+"");
    }
}
//SESHANBA UCHUN FUNKSIYA//


//CHORSHANBA UCHUN FUNKSIYA//

async function chorFunction(chat_id){
    try {
        let user =await connectModel.findOne({telegram_Id:chat_id})
    if(user.chorshanba.length){
        return true
    }
    else{
        return false 
    }
    } catch (error) {
        console.log(error+"");
    }

}

//CHORSHANBA UCHUN FUNKSIYA //

//PAYSHANBA UCHUN FUNKSIYA //

async function payFunction(chat_id){
    try {
        let user =await connectModel.findOne({telegram_Id:chat_id})
    if(user.payshanba.length){
        return true
    }
    else{
        return false 
    }
    } catch (error) {
        console.log(error+"");
    }

}
//PAYSHANBA UCHUN FUNKSIYA //

//JUMA UCHUN FUNKSIYA //
async function juFunction(chat_id){
    try {
        let user =await connectModel.findOne({telegram_Id:chat_id})
    if(user.juma.length){
        return true
    }
    else{
        return false 
    }
    } catch (error) {
        console.log(error+"");
    }

}

//JUMA UCHUN FUNKSIYA //

//SHANBA UCHUN FUNKSIYA//
async function shaFunction(chat_id){
    try {
        let user =await connectModel.findOne({telegram_Id:chat_id})
    if(user.shanba.length){
        return true
    }
    else{
        return false 
    }
    } catch (error) {
        console.log(error+"");
    }

}

//SHANBA UCHUN FUNKSIYA//
module.exports={
    duFunction,
    seFunction,
    chorFunction,
    payFunction,
    juFunction,
    shaFunction
}