const Role=require('../app/controller/role.controller').Role
const addRoute=require('../app/controller/role.controller').addRoute
const deleteRoute=require('../app/controller/role.controller').deleteRoute
const router=require('express').Router()
router.post('/route',addRoute)
router.delete('/route/:id',deleteRoute)
router.post('/role',Role.addRole)
router.delete('/role/:id',Role.deleteRole)
router.get('/role/:id',Role.getRole)
router.put('/role/:id',Role.editRole)
router.post('/routetorole/:id',Role.addRouteToRole)
router.delete('/routetorole/:id',Role.deleteRouteFromRole)
module.exports=router