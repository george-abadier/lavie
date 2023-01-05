const Helper = require("../helper")
const productModel = require('../../db/models/products.model')
const { head } = require("../src")
class Product {
    static add = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            const product = productModel(req.body)
            return product.save()
        }, 'product added successfully')
    }
    static rate = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            return productModel.findByIdAndUpdate(req.params.id, { $push: { ratings: { ...req.body, userID: req.user._id } } })
        }, 'you added your rate successfully')
    }
    static showProductRatings=async(req,res)=>{
        try   {
            const product= await productModel.findById(req.params.id,['ratings'])
            const ratings=product.ratings
            ratings.sort((a,b)=>b.helpful-a.helpful)
            Helper.formatMyAPIRes(res,200,true,ratings,'here the rates sorted')
        }
        catch(e){
            Helper.formatMyAPIRes(res,500,false,e,e.message)
        }
        
    }
    static moreHelpful=(req,res)=>{
        Helper.handlingMyFunction(req,res,async(req)=>{
            const product=await productModel.findById(req.params.productID)
            console.log(product)
            const i=product.ratings.findIndex(rate=>{return rate._id==req.params.rateID})
            product.ratings[i].helpful++
            return product.save()
        },'increased')
    }
}
module.exports = Product