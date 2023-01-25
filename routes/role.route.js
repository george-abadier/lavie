const { auth, authToThisRoute } = require('../app/mddleware')
const{editRouteAction,getRoutes,deleteRoute,addRoute ,Role}=require('../app/controller/role.controller')
const router=require('express').Router()
//route routes to be removed
router.post('/lavie/route',addRoute)
router.delete('/lavie/route/:id',deleteRoute)
//accessable route routes
router.get('/lavie/routes',auth,authToThisRoute,getRoutes)
router.put('/lavie/route/:id/:newName',auth,authToThisRoute,editRouteAction)
//................................................................................
//role routes
router.post('/lavie/role',auth,authToThisRoute,Role.addRole)
router.delete('/lavie/role/:id',auth,authToThisRoute,Role.deleteRole)
router.get('/lavie/roles',auth,authToThisRoute,Role.getRoles)
router.get('/lavie/role/:id',auth,authToThisRoute,Role.getRole)
router.put('/lavie/role/:id',auth,authToThisRoute,Role.editRole)
router.put('/lavie/routetorole/:id',auth,authToThisRoute,Role.addRouteToRole)
router.delete('/lavie/routetorole/:id',auth,authToThisRoute,Role.deleteRouteFromRole)
module.exports=router