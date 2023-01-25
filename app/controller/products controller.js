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
    static delete = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return productModel.findByIdAndDelete(req.params.id)
        }, 'product added successfully')
    }
    static edit = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return productModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { returnDocument: 'after' })
        }, 'product added successfully')
    }
    static getAll = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return productModel.find().populate('about')
        }, 'product added successfully')
    }
    static getSingle = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return productModel.findById(req.params.id).populate('about')
        }, 'product added successfully')
    }
    // static rate = (req, res) => {
    //     Helper.handlingMyFunction(req, res, async (req) => {
    //         return productModel.findByIdAndUpdate(req.params.id, { $push: { ratings: { ...req.body, userID: req.user._id } } }, { returnDocument: 'after' })
    //     }, 'you added your rate successfully')
    // }
    static rate = async (req, res) => {
        try {
            const product = await productModel.findById(req.params.id)
            product.ratings.push({ ...req.body, userID: req.user._id,raterType:req.user.level?'users':'employees' })
            console.log(product)
            const result = await product.save()
            Helper.formatMyAPIRes(res, 200, true, result, 'here the rates sorted')
        }
        catch (e) {
            Helper.formatMyAPIRes(res, 500, false, e, e.message)
        }
    }

    static showProductRatings = async (req, res) => {
        try {
            const product = await productModel.findById(req.params.id, ['ratings'])
            const ratings = product.ratings
            ratings.sort((a, b) => b.helpful - a.helpful)
            Helper.formatMyAPIRes(res, 200, true, ratings, 'here the rates sorted')
        }
        catch (e) {
            Helper.formatMyAPIRes(res, 500, false, e, e.message)
        }

    }
    static showSuggestedProduct=async(req,res)=>{
        try{
            const product=await productModel.find().populate('about')
        const suggestedProduct=product.filter(p=>{
            return p.about.forLevel==req.user.level
        })
        Helper.formatMyAPIRes(res, 200, true, suggestedProduct, 'here the rates sorted')
    }catch (e) {
        Helper.formatMyAPIRes(res, 500, false, e, e.message)
    }

    }
    static moreHelpful = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const product = await productModel.findById(req.params.productID)
            console.log(product)
            const i = product.ratings.findIndex(rate => { return rate._id == req.params.rateID })
            console.log(i,product[i])
            product.ratings[i].helpful++
            return product.save()
        }, 'increased')
    }
}
module.exports = Product