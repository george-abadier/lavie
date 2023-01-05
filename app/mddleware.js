const employeeModel = require('../db/models/employee.model')
const userModel = require('../db/models/user.model')
const tokenModel = require('../db/models/tokens.model')
const roleModel = require('../db/models/role.model')
const jsonWebToken = require("jsonwebtoken")
const helper = require('./helper')
const auth = async (req, res, next) => {
    try {
        let token
        if (req.params.confimation) {
            token = req.params.confimation
        } else {
            token = req.header('Authorization')
        }
        const tokenExist = await tokenModel.findOne({ token })
        if (!tokenExist) {
            throw new Error('invalid token')
        }

        const user = await userModel.findById(tokenExist.owner)
        if (!user) {
            const employee = employeeModel.findById(tokenExist.owner)
            if (!employee) {
                throw new Error('invalid token owner')
            }
            if (req.params.confimation) {
                user.date = ""
                if (user.role.role == 'manager') { user.status = true }
                await user.save()
            }else{
            req.user = user
            req.token = token
            next()
        }
        } else {
            if (req.params.confimation) {
                user.date = ""
                user.status = true
                await user.save()
            }
            req.user = user
            req.token = token
            next()
        }
    }
    catch (e) {
        helper.formatMyAPIRes(res, 500, false, e, e.message)
    }
}

const authToThisRoute = async (req, res, next) => {
    const role = await roleModel.findById(req.user.role).populate('routes')

    const allowed = role.routes.find(route => {
        return (route.route == req.route.path && route.method == req.method)
    })
    if (allowed) {
        next()
    } else {
        helper.formatMyAPIRes(res, 500, false, null, 'you aren`t allowed to this route')
    }
}
module.exports.auth = auth
module.exports.authToThisRoute = authToThisRoute