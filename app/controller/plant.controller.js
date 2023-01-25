// const escapeStingRegexp=require('escape-string-regexp')
const dataModel = require('../../db/models/data.model')
const plantModel=require('../../db/models/plant.model')
const Helper = require("../helper")
class Plant{
    static add=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
            return plantModel(req.body).save()
        },'you added the plant successfully')
    }
    static edit=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
            return plantModel.findByIdAndUpdate(req.params.id,{$set:req.body}, { returnDocument: 'after' })
        },'you edit the plant successfully')
    }
    static delete=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
            return plantModel.findByIdAndDelete(req.params.id)
        },'you delete the plant successfully')
    }
    static getAll=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
            return plantModel.find()
        },'here is all the plants ')
    } 
    static getSingle=async(req,res)=>{
        try{
            const plant=await plantModel.findById(req.params.id).populate('data')
            const data=plant.data
            // data=data.map(d=>{return dataModel(d).populate('plant')})
            Helper.formatMyAPIRes(res, 200, true,{plant,data},"here is your plant and the data about it")
        } catch (e) {
            console.log(e)
             Helper.formatMyAPIRes(res, 500, false, e, e.message)
        }
    }
    static searchAbout=async(req,res)=>{
        try{
            const $regex=req.params.search
            const plants=await plantModel.find({name:{$regex}}).populate('data')
            let data=[]
            plants.forEach(p=>{
                data=data.concat(p.data)
            })
            // data=data.map(d=>{return dataModel(d).populate('plant')})
            Helper.formatMyAPIRes(res, 200, true,{plants,data},"here is your plants and the data about it")
        } catch (e) {
            console.log(e)
             Helper.formatMyAPIRes(res, 500, false, e, e.message)
        }
    }
}
module.exports=Plant