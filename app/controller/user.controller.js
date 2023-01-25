const Helper = require("../helper")
const { sendConfirmationEmail,sendResetPassEmail } = require("../mail")
const userModel = require('../../db/models/user.model')
const tokenModel = require('../../db/models/tokens.model')
const jwt = require('jsonwebtoken')
class User {
    static signUp = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const fullNameReg = /^[a-zA-z]{3,}\s{1}[a-zA-Z]{3,}$/
            const passReg = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
            if (!fullNameReg.test(req.body.userName)) {
                throw new Error('your name doesn`t match the rules')
            }
            if (!passReg.test(req.body.password)) {
                throw new Error('your password doesn`t match the rules')
            }
            const user = userModel(req.body)
            const token = await tokenModel.creatToken(user._id)

            sendConfirmationEmail(user.userName, user.email, 'user/'+token)
            await tokenModel({ token, owner: user._id, date: new Date() }).save()
            await user.save()
        }, 'check your mail for confirmation')
    }
    static logIn = async (req, res) => {
        try {
            const userData = await userModel.logIn(req.body.email, req.body.password)
            if (!userData.status) {
                throw new Error('please go to your mail to confirm you sign up')
            }
            const token = await tokenModel.creatToken(userData._id, req.body.rememberMe)
            if (req.body.rememberMe) {
                tokenModel({ token, owner: userData._id }).save()
            } else {
                tokenModel({ token, owner: userData._id, date: new Date() }).save()
            }
            Helper.formatMyAPIRes(res, 200, true, { userData, token }, "you logged in successfully,here is you profile&your token")
        }
        catch (e) {
            Helper.formatMyAPIRes(res, 500, false, e, e.message)
        }
    }
    static logInByApps = async (req, res) => {
        try {
            const user = await userModel.findOne({ email: req.user.emails[0].value })
            if(!user){
                throw new Error('the owner of this account have no account in la vie ')
            }
            const token = await tokenModel.creatToken(user._id, false)
            await tokenModel({ token, owner: user._id, date: new Date() }).save()
            Helper.formatMyAPIRes(res, 200, true, { user, token }, "you logged in successfully,here is you profile&your token")
        }
        catch (e) {
            console.log(e)
            Helper.formatMyAPIRes(res, 500, false, e, e.message)
        }
    }
    static forgetMyPass = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const user = await userModel.findOne({ email: req.body.email })
            console.log(req.body.email)
            if (!user) {
                throw new Error('there is no such email')
            }
            const token = await tokenModel.creatToken(user._id, false)
            sendResetPassEmail(user.userName, req.body.email, token)
        }, 'check your mail')
    }
    static resetPass = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            jwt.verify(req.params.token, process.env.tokenPass)
            const user = await userModel.findOne({ email: req.body.email })
            user.password = req.body.password
            tokenModel.deleteMany({ owner: user._id })
            user.save()
        }, 'now try to login again with your new password')
    }
    static logOut = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            await tokenModel.findOneAndDelete({ token: req.token })
        }, 'logged out successfully')
    }
    static setLevel = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            req.user.level = req.body.level
            return req.user.save()
        }, 'you set your level successfully')
    }
    static getPrivacyPolicy = (req, res) => {
        res.redirect('https://www.freeprivacypolicy.com/live/bb68c15e-9654-4bb7-b18b-8ec61729fedf')
    }
    static myProfile = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            if (req.params.confimation) {
                return  { user: req.user, token: req.token }
            } else {
                return req.user
            }
        }, 'congratulation you made a new account here is your profile')
    }
}
module.exports = User