const Helper = require('../helper')
const tokenModel=require('../../db/models/tokens.model')
const employeeModel = require('../../db/models/employee.model')
const { sendConfirmationEmail } = require("../mail")
const { handlingMyFunction } = require('../helper')
const user = require('../../db/models/user.model')
class Employee {
    static addEmployee = (req, res) => {
        // Helper.handlingMyFunction(req, res, (req) => {
        //     const employee = employeeModel(req.body)
        //     return employee.save()
        // }, 'you add employee')
        Helper.handlingMyFunction(req, res, async (req) => {
            const fullNameReg = /^[a-zA-z]{3,}\s{1}[a-zA-Z]{3,}$/
            const passReg = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
            if (!fullNameReg.test(req.body.userName)) {
                throw new Error('your name doesn`t match the rules')
            }
            if (!passReg.test(req.body.password)) {
                throw new Error('your password doesn`t match the rules')
            }
            const employee = employeeModel(req.body)
            console.log(employee)
            const token = await tokenModel.creatToken(employee._id)

            sendConfirmationEmail(employee.userName, employee.email, 'employee/'+token)
            await tokenModel({ token, owner: employee._id, date: new Date() }).save()
            await employee.save()
        }, 'check your mail for confirmation')
    }
    static logIn = async (req, res) => {
        try {
            const employee = await employeeModel.logIn(req.body.email, req.body.password)
            if (!employee.status) {
                throw new Error('please go back to your manger to activate your account')
            }
            const token = await tokenModel.creatToken(employee._id, req.body.rememberMe)
            if (req.body.rememberMe) {
                tokenModel({ token, owner: employee._id }).save()
            } else {
                tokenModel({ token, owner: employee._id, date: new Date() }).save()
            }
            Helper.formatMyAPIRes(res, 200, true, { employee, token }, "you logged in successfully,here is you profile&your token")
        }
        catch (e) {
            Helper.formatMyAPIRes(res, 500, false, e, e.message)
        }
    }
    static activateSupporter=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
            return employeeModel.findByIdAndUpdate(req.params.supporter,{$set:{status:true}}, { returnDocument: 'after' })
        },'this supporter is active now')
    }
    static deactivateSupporter=(req,res)=>{
        Helper.handlingMyFunction(req,res,async(req)=>{
            await tokenModel.deleteMany({owner:req.params.supporter})
            return employeeModel.findByIdAndUpdate(req.params.supporter,{$set:{status:false}})
        },'this supporter is inactive now')
    }
    static deleteEmployee = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return employeeModel.findByIdAndDelete(req.params.id)
        }, 'you deleted employee successfully')
    }
    static editeEmployee_ME = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return employeeModel.findByIdAndUpdate(req.user._id, req.body, { returnDocument: 'after' })
        }, 'you add employee')
    }
    static getEmployee = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return employeeModel.findById(req.params.id)
        }, 'you add employee')
    }
    static getEmployees=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
            return employeeModel.find(req.body)
        },"here are all the employees")
    }
    static addPhoneNumberToEmployee_Me = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            if (req.user.phoneNums.find(phone => { return phone.number == req.body.number })) {
                throw new Error('you have this number already')
            }else{
                req.user.phoneNums.push(req.body)
                return req.user.save()
            }
        }, 'you add your new phone number')
    }
    static addTargetToEmployee = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const employee = await employeeModel.findById(req.params.id)
            console.log(employee.targets.find(phone=>{ return phone.number == req.body.number }))
            if (employee.targets.find(target => { return target.dateOfTarget.getMonth()== new Date(req.body.dateOfTarget).getMonth() })) {
                throw new Error('the employee have this number already')
            }else{
                employee.phoneNums.push(req.body)
                return employee.save()
            }
        }, 'you add employee')
    }
    static myProfile=(req,res)=>{
        Helper.handlingMyFunction(req, res, (req) => {
            if (req.params.confimation) {
                return req.user.role.role=='manager'? { user: req.user, token: req.token }:{}
            } else {
                return req.user
            }
        }, req.user.role.role=='manager'?'congratulation you made a new account here is your profile':'congratulation you made a new job account wait for your manger to activate the account')
    }
    static logOut=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
            return tokenModel.findOneAndDelete({token:req.token})
        },"you logged out from this browser successfully")
    }
    static logOutFromAllDevices=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
            return tokenModel.deleteMany({owner:req.user._id})
        },"you logged out from this browser successfully")
    }
}
module.exports = Employee