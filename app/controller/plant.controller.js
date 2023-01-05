// const escapeStingRegexp=require('escape-string-regexp')
const plantModel=require('../../db/models/plant.model')
const Helper = require("../helper")
class Plant{
    static add=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
            return plantModel(req.body).save()
        },'you added the plant successfully')
    }
    static searchAbout=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
            const $regex=req.params.search
            return  plantModel.find({name:{$regex}}).populate('data')
        })
    }
}
module.exports=Plant