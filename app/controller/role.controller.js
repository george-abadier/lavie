const roleModel = require('../../db/models/role.model')
const routeModel = require('../../db/models/route.model')
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
const deleteRoute =(req, res) => {
    Helper.handlingMyFunction(req,res,async(req)=>{
        return  routeModel.findByIdAndDelete(req.params.id)
    },'you insert your route successfully')
}
module.exports.Role = Role
module.exports.addRoute = addRoute
module.exports.deleteRoute = deleteRoute