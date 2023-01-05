
const Helper = require("../helper")
const plantModel=require('../../db/models/plant.model')
const dataModel=require('../../db/models/data.model')
const { head } = require("../../routes/plant.route")
class Data{
    static add=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
            return dataModel(req.body).save()
        },'you added data successfully')
    }
    static getSuggested=async(req,res)=>{
        // Helper.handlingMyFunction(req,res,(req)=>{
        //     return dataModel.find()
        // },"here is you data according to your level ")
        try{
            const resault=[]
            const data1=await dataModel.find({forLevel:req.user.level})
            const data2=await plantModel.find({forLevel:req.user.level}).populate()
            resault.concat(data1)
            data2.forEach(d=>{
                resault.concat(d.data)
            })
            Helper.formatMyAPIRes(res,200,true,resault,"here is you data according to your level ")
        }catch(e){
            head.formatMyAPIRes(res,500,false,e,e.message)
        }
    }
    static getdataAbout=async(req,res)=>{
        // Helper.handlingMyFunction(req,res,(req)=>{
        //     return dataModel.find({$or:[{subject}]})
        // },'here is the data you search about')
        try{
            const $regex=req.body.search
            const plants= await plantModel.find({name:{$regex}},_id)
            console.log(plants)
            const resault=dataModel.find({$or:[{subject:{$regex}},{plant:{$in:plants}}]})
            Helper.formatMyAPIRes(res,200,true,resault,'here is the data you search about')
        }
        catch(e){

        }
    }
}
module.exports=Data