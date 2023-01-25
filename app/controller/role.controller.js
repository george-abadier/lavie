const roleModel = require('../../db/models/role.model')
const routeModel = require('../../db/models/route.model')
const { handlingMyFunction } = require('../helper')
const Helper = require('../helper')
class Role {
    static addRole =(req, res) => {
        // try{
        //     const role=roleModel(req.body)
        //     const result=await role.save()
        //     Helper.formatMyAPIRes(res,200,true,result,'you insert your role successfully')
        // }catch(e){
        // Helper.formatMyAPIRes(res,500,false,e,e.message)
        // }
        Helper.handlingMyFunction(req,res,async(req)=>{
            const role=roleModel(req.body)
            return role.save()
        },'you insert your role successfully')
    }
    static deleteRole=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
          return  roleModel.findByIdAndDelete(req.params.id)
        },'role deleted')
    } 
    static getRole=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
          return  roleModel.findById(req.params.id)
        },'here is your role')
    }
    static getRoles=(req,res)=>{
        handlingMyFunction(req,res,(req)=>{
            return roleModel.find()
        },'here is all roles')
    }
    static editRole=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
          return  roleModel.findByIdAndUpdate(req.params.id,req.body,{returnDocument:'after'})
        },'here is your role')
    }
    static addRouteToRole=(req,res)=>{
        Helper.handlingMyFunction(req,res,async (req)=>{
            const role=await roleModel.findById(req.params.id)
            const route=role.routes.find(R=>{return R==req.body.route})
            if(route){
                throw new Error('this role already have this route')
            }else{
                role.routes.push(req.body.route)
               return role.save()
            }
        },'you added the route saccessfuly')
    }
    static deleteRouteFromRole=(req,res)=>{
        Helper.handlingMyFunction(req,res,async(req)=>{
            const role=await roleModel.findById(req.params.id)
            const i=role.routes.findIndex(R=>{return R==req.body.route})
            console.log(i)
            if(i==-1){
                throw new Error('this role didn`t have this route')
            }else{
                role.routes.splice(i,1)
                return role.save()
            }
        },'route deleted')
    }
}
const getRoutes=(req,res)=>{
    handlingMyFunction(req,res,(req)=>{
        return routeModel.find({routeAction:{$ne:''}})
    },'here is all permissions')
}
const editRouteAction=(req,res)=>{
    handlingMyFunction(req,res,(req)=>{
        return routeModel.findByIdAndUpdate(req.params.id,{routeAction:req.params.newName},{returnDocument:'after'})
    },'name changed successfully')
}
//developer methods .....to be removed after development mood.........
const deleteRoute =(req, res) => {
    Helper.handlingMyFunction(req,res,async(req)=>{
        return  routeModel.findByIdAndDelete(req.params.id)
    },'you insert your route successfully')
}
const addRoute =(req, res) => {
    Helper.handlingMyFunction(req,res,async(req)=>{
        const route = routeModel(req.body)
        return  route.save()
    },'you insert your route successfully')
    // try {
    //     console.log(req.body)
    //     const route = routeModel(req.body)
    //     const result = await route.save()
    //     Helper.formatMyAPIRes(res,200,true,result,'you insert your route successfully')
    // }
    // catch (e) {
    //     Helper.formatMyAPIRes(res,500,false,e,e.message)
    // }
}
module.exports.Role = Role
module.exports.editRouteAction = editRouteAction
module.exports.addRoute = addRoute
module.exports.getRoutes = getRoutes
module.exports.deleteRoute = deleteRoute