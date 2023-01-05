const Helper = require("../helper");
const cartModel=require('../../db/models/cart.model');
const { sendConfirmationEmail } = require("../mail");
class Cart{
    static addToCart=(req,res)=>{
        Helper.handlingMyFunction(req,res,async (req)=>{
           let myCart=await cartModel.findOne({userID:req.user._id,status:'not completed'})
           if(myCart){
            myCart.totalPrice+=(req.body.number*req.body.price)
            myCart.products.push(req.body)
           }else{
            myCart=await cartModel({userID:req.user._id,email:req.user.email,totalPrice:(req.body.number*req.body.price)})
            myCart.products.push(req.body)
           }
           return myCart.save()
        },'added to your cart')
    }
}
module.exports=Cart