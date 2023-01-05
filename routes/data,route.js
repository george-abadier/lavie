const { authToThisRoute, auth } = require('../app/mddleware')
const Data=require('../app/controller/data.controller')
const router=require('express').Router()
router.post('/lavie/data',auth,authToThisRoute,Data.add)
router.get('/lavie/suggesteddata',auth,authToThisRoute,Data.getSuggested)
module.exports=router