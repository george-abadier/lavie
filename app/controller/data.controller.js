
const Helper = require("../helper")
const plantModel = require('../../db/models/plant.model')
const dataModel = require('../../db/models/data.model')
const { head } = require("../../routes/plant.route")
class Data {
    static add = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return dataModel(req.body).save()
        }, 'you added data successfully')
    }
    static edit = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return dataModel.findByIdAndUpdate(req.params.id,{$set:req.body},{returnDocument:'after'})
        }, 'you edit data successfully')
    }
    static delete = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return dataModel.findByIdAndDelete(req.params.id)
        }, 'you delete data successfully')
    }
    static getSuggested = async (req, res) => {
        // Helper.handlingMyFunction(req,res,(req)=>{
        //     return dataModel.find()
        // },"here is you data according to your level ")
        try {
            let result = []
            const data1 = await dataModel.find({ forLevel: req.user.level })
            const data2 = await dataModel.find({ type: 'about plant' }).populate("plant")
            // console.log(data2[1].plant)
            result = data1
            data2.forEach(d => {
                if (d.plant.forLevel == req.user.level){
                    result=result.concat(d)
                }
            })
            Helper.formatMyAPIRes(res, 200, true, result, "here is you data according to your level ")
        } catch (e) {
            Helper.formatMyAPIRes(res, 500, false, e, e.message)
        }
    }
    static getDataAbout = async (req, res) => {
        // Helper.handlingMyFunction(req,res,(req)=>{
        //     return dataModel.find({$or:[{subject}]})
        // },'here is the data you search about')
        try {
            console.log(req.params.search)
            const $regex = req.params.search
            const plants = await plantModel.find({ name: { $regex } },'_id')
            const result =await dataModel.find({ $or: [{ subject: { $regex } }, { plant: { $in: plants } }] })
            Helper.formatMyAPIRes(res, 200, true, result, 'here is the data you search about')
        }
        catch (e) {
            Helper.formatMyAPIRes(res, 500, false, e, e.message)
        }
    }
}
module.exports = Data