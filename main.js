const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
const bot = new TelegramBot(process.env.BOT_TOKEN_1, {polling: true})
const {connectDb, connectModel}=require('./db')
let duState=0
let seState=0
let chorState=0
let payState=0
let juState=0
let shaState=0

let duWatchState=0
let seWatchState=0 
let chorWatchState=0
let payWatchState=0
let juWatchState=0
let shaWatchState=0


let changestate=0


let {duFunction,
    seFunction,
    chorFunction,
    payFunction,
    juFunction,
    shaFunction
                 }=require('./weekendFunctions')

connectDb()


 
bot.on('message', async(message)=>{
    const chatId=message.chat.id 
    let keyboards={
        resize_keyboard:true,
        one_time_keyboard: true,
        keyboard:[
             ['1️⃣ Dushanba', '2️⃣ Seshanba'],
             ['3️⃣ Chorshanba', '4️⃣ Payshanba'],
             ['5️⃣ Juma', '6️⃣ Shanba'],
             ["🖌 Jadvalni o'zgartirish"]
        ]
    }

    //START bosilganda 

    if(message.text=='/start'){
       try {
        let isHaveUser= await connectModel.findOne({telegram_Id:chatId})
        if(isHaveUser==null){
            await connectModel.create({telegram_Id:chatId})
            
        }
        bot.sendMessage(chatId,`Assalomu alaykum <b>${message.from.first_name}</b>.\n Dars jadvalingizni ko'rish uchun hafta kunini tanlang`,{
            parse_mode:'HTML',
            reply_markup:keyboards
        })
       } catch (error) {
           console.log(error+"");
       }
    
    }
     // JADVALNI O"ZGARTIRISH //

    else if(message.text=="🖌 Jadvalni o'zgartirish"){
        bot.sendMessage(chatId, "Qaysi kun uchun dars jadvalini o'zgartirmoqchi bo'lsangiz \no'sha button ustiga bosing.",{
            reply_markup:keyboards
        })
        changestate=1    
        
    }
      //JADVALNI OZGARTIRISH //



      //QAYTDAN MA'LUMOTLARNI O'ZGARTIRISH 

    else if(message.text=='1️⃣ Dushanba' && changestate==1){
        bot.sendMessage(chatId, 'Dushanba uchun qaytadan darslarni kiriting')
        duWatchState=1 
        changestate=0
    }
    else if(message.text=='2️⃣ Seshanba' && changestate==1){
        bot.sendMessage(chatId, 'Seshanba uchun darslarni qaytadan kiriting')
        seWatchState=1
        changestate=0
    }
    else if(message.text=='3️⃣ Chorshanba' && changestate==1){
        bot.sendMessage(chatId, 'Chorshanba uchun darslarni qaytadan kiriting')
        chorWatchState=1
        changestate=0
    }
    
     else if(message.text=='4️⃣ Payshanba'&& changestate==1 ){
        bot.sendMessage(chatId, 'Payshanba uchun darslarni qaytadan kiriting')
        payWatchState=1
        changestate=0

     }
     else if(message.text=='5️⃣ Juma' && changestate==1){
        bot.sendMessage(chatId, 'Juma uchun darslarni qaytadan kiriting')
        juWatchState=1
        changestate=0
     }
     else if(message.text=='6️⃣ Shanba' && changestate==1){
        bot.sendMessage(chatId, 'Shanba uchun darslarni qaytadan kiriting')
        shaWatchState=1
        changestate=0
     }

    else if(duWatchState==1){
        let data = message.text.split(',')
        let user= await connectModel.findOneAndUpdate({telegram_Id:chatId},{
            dushanba:data 
        })
        await bot.sendMessage(chatId, "Muvaffaqiyatli o'zgartirildi.")
        duWatchState=0  
        
    }
    else if(seWatchState==1){
        let data=message.text.split(',')
        let user= await connectModel.findOneAndUpdate({telegram_Id:chatId},{
            seshanba:data 
        })
        await bot.sendMessage(chatId, "Muvaffaqiyatli o'zgartirildi.")
        seWatchState=0
    }
    else if(chorWatchState==1){
        let data=message.text.split(',')
        let user = await connectModel.findOneAndUpdate({telegram_Id:chatId},{
            chorshanba:data 
        })
        await bot.sendMessage(chatId, "Muvaffaqiyatli o'zgartirildi.")
        chorWatchState=0
    }
    else if(payWatchState==1){
        let data=message.text.split(',')
        let user = await connectModel.findOneAndUpdate({telegram_Id:chatId},{
            payshanba:data 
        })
        await bot.sendMessage(chatId, "Muvaffaqiyatli o'zgartirildi.")
        payWatchState=0
    }
    else if(juWatchState==1){
        let data=message.text.split(',')
        let user = await connectModel.findOneAndUpdate({telegram_Id:chatId},{
            juma:data 
        })
        await bot.sendMessage(chatId, "Muvaffaqiyatli o'zgartirildi.")
        juWatchState=0

    }

    else if(shaWatchState==1){
        let data=message.text.split(',')
        let user = await connectModel.findOneAndUpdate({telegram_Id:chatId},{
            shanba:data 
        })
        await bot.sendMessage(chatId, "Muvaffaqiyatli o'zgartirildi.")
        shaWatchState=0

    }


    //QAYTADAN MA'LUMOTLARNI O'ZGARTIRISH //



    // DUSHANBA 
    else if(message.text=='1️⃣ Dushanba' && await duFunction(chatId)){
       try {
        let user=await connectModel.findOne({telegram_Id:chatId})
        let data=''
        for(let element of user.dushanba){
            data=data+' '+ element
        }
        bot.sendMessage(chatId, data)
           
       } catch (error) {
             console.log(error+"")
       }
    }


    else if(message.text=='1️⃣ Dushanba' && await duFunction(chatId)==false){
           try {
            bot.sendMessage(chatId, 'Dushanba kun uchun darslarini qoshing.')
            let isHaveDu= await connectModel.findOne({telegram_Id:chatId})
            if(isHaveDu.dushanba.length==0){
                duState=1
            }
           } catch (error) {
                console.log(error+"")
           }

            
            
    }
    
    else if(duState==1){
        await bot.sendMessage(chatId, "Vazifalar muvaffaqiyatli qo'shildi")
       try {
        let data= message.text.split(',')
        // await connectModel.create({dushanba:data})
       
         await connectModel.findOneAndUpdate({telegram_Id:chatId},{
            dushanba:data 
        })
        duState=0
           
       } catch (error) {
           console.log(error+"")
       }  
        
    }

    //DUSHANBA //


    //SESHANBA //
    else if(message.text=='2️⃣ Seshanba' && await seFunction(chatId)){
        try {
            let user=await connectModel.findOne({telegram_Id:chatId})
            let data=''
            for(let element of user.seshanba){
                data=data+ ' '+ element
            }
            bot.sendMessage(chatId, data)
               
           } catch (error) {
                 console.log(error+"")
           }

     }

    else if(message.text=='2️⃣ Seshanba' && await seFunction(chatId)==false){
        try {
         bot.sendMessage(chatId, 'Seshanba kun uchun darslarini kiriting.')
         let isHaveSe= await connectModel.findOne({telegram_Id:chatId})
         if(isHaveSe.seshanba.length==0){
             seState=1
         }
        } catch (error) {
             console.log(error+"")
        }

         
         
 }
 else if(seState==1){
   try {
    await bot.sendMessage(chatId, "Vazifalar muvaffaqiyatli qo'shildi")
    let data= message.text.split(',')
    // await connectModel.create({dushanba:data})
   
     await connectModel.findOneAndUpdate({telegram_Id:chatId},{
        seshanba:data 
    })
    seState=0
       
   } catch (error) {
       console.log(error+"")
   }  
    
}



    //SESHANBA//

    //CHORSHANBA//

    else if(message.text=='3️⃣ Chorshanba' && await chorFunction(chatId)){
        try {
            let user=await connectModel.findOne({telegram_Id:chatId})
            let data=''
            for(let element of user.chorshanba){
                data=data+ ' '+ element
            }
            bot.sendMessage(chatId, data)
               
           } catch (error) {
                 console.log(error+"")
           }

     }

    else if(message.text=='3️⃣ Chorshanba' && await chorFunction(chatId)==false){
        try {
         bot.sendMessage(chatId, 'Chorshanba kun uchun darslarini kiriting.')
         let isHaveChor= await connectModel.findOne({telegram_Id:chatId})
         if(isHaveChor.chorshanba.length==0){
             chorState=1
         }
        } catch (error) {
             console.log(error+"")
        }

         
         
 }
 else if(chorState==1){
   try {
    await bot.sendMessage(chatId, "Vazifalar muvaffaqiyatli qo'shildi")
    let data= message.text.split(',')
    // await connectModel.create({dushanba:data})
   
     await connectModel.findOneAndUpdate({telegram_Id:chatId},{
        chorshanba:data 
    })
    chorState=0
       
   } catch (error) {
       console.log(error+"")
   }  
    
}

    //CHORSHANBA//


    //PAYSHANBA//

    else if(message.text=='4️⃣ Payshanba' && await payFunction(chatId)){
        try {
            let user=await connectModel.findOne({telegram_Id:chatId})
            let data=''
            for(let element of user.payshanba){
                data=data+ ' '+ element
            }
            bot.sendMessage(chatId, data)
               
           } catch (error) {
                 console.log(error+"")
           }

     }

    else if(message.text=='4️⃣ Payshanba' && await payFunction(chatId)==false){
        try {
         bot.sendMessage(chatId, 'Payshanba kun uchun darslarini kiriting.')
         let isHavePay= await connectModel.findOne({telegram_Id:chatId})
         if(isHavePay.payshanba.length==0){
             payState=1
         }
        } catch (error) {
             console.log(error+"")
        }

         
         
 }
 else if(payState==1){
   try {
    await bot.sendMessage(chatId, "Vazifalar muvaffaqiyatli qo'shildi")
    let data= message.text.split(',')
    // await connectModel.create({dushanba:data})
   
     await connectModel.findOneAndUpdate({telegram_Id:chatId},{
        payshanba:data 
    })
    payState=0
       
   } catch (error) {
       console.log(error+"")
   }  
    
}


    //PAYSHANBA//



    //JUMA//

    else if(message.text=='5️⃣ Juma' && await juFunction(chatId)){
        try {
            let user=await connectModel.findOne({telegram_Id:chatId})
            let data=''
            for(let element of user.juma){
                data=data+ ' '+ element
            }
            bot.sendMessage(chatId, data)
               
           } catch (error) {
                 console.log(error+"")
           }

     }

    else if(message.text=='5️⃣ Juma' &&  await juFunction(chatId)==false){
        try {
         bot.sendMessage(chatId, 'Juma kun uchun darslarini kiriting.')
         let isHaveJu= await connectModel.findOne({telegram_Id:chatId})
         if(isHaveJu.juma.length==0){
             juState=1
         }
        } catch (error) {
             console.log(error+"")
        }

         
         
 }
 else if(juState==1){
   try {
    await bot.sendMessage(chatId, "Vazifalar muvaffaqiyatli qo'shildi")
    let data= message.text.split(',')
    // await connectModel.create({dushanba:data})
   
     await connectModel.findOneAndUpdate({telegram_Id:chatId},{
        juma:data 
    })
    juState=0
       
   } catch (error) {
       console.log(error+"")
   }  
    
}


    

    //SHANBA//

    else if(message.text=='6️⃣ Shanba' && await shaFunction(chatId)){
        try {
            let user=await connectModel.findOne({telegram_Id:chatId})
            let data=''
            for(let element of user.shanba){
                data=data+ ' '+ element
            }
            bot.sendMessage(chatId, data)
               
           } catch (error) {
                 console.log(error+"")
           }

     }

    else if(message.text=='6️⃣ Shanba' &&  await shaFunction(chatId)==false){
        try {
         bot.sendMessage(chatId, 'Shanba kun uchun darslarini kiriting.')
         let isHaveSha= await connectModel.findOne({telegram_Id:chatId})
         if(isHaveSha.shanba.length==0){
             shaState=1
         }
        } catch (error) {
             console.log(error+"")
        }

         
         
 }
 else if(shaState==1){
   try {
    await bot.sendMessage(chatId, "Vazifalar muvaffaqiyatli qo'shildi")
    let data= message.text.split(',')
    // await connectModel.create({dushanba:data})
   
     await connectModel.findOneAndUpdate({telegram_Id:chatId},{
        shanba:data 
    })
    shaState=0
       
   } catch (error) {
       console.log(error+"")
   }  
    
}

    //SHANBA//
   

})
