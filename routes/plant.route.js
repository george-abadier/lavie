const Plant=require('../app/controller/plant.controller')
const { authToThisRoute, auth } = require('../app/mddleware')
const router=require('express').Router()
router.post('/lavie/plant',auth,authToThisRoute,Plant.add)
router.get('/lavie/plant/:search',auth,authToThisRoute,Plant.searchAbout)
module.exports=router