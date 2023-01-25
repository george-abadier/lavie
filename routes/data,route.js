const { authToThisRoute, auth } = require('../app/mddleware')
const Data=require('../app/controller/data.controller')
const router=require('express').Router()
router.post('/lavie/data',auth,authToThisRoute,Data.add)
router.put('/lavie/data/:id',auth,authToThisRoute,Data.edit)
router.delete('/lavie/data/:id',auth,authToThisRoute,Data.delete)
router.get('/lavie/suggesteddata',auth,authToThisRoute,Data.getSuggested)
router.get('/lavie/datafor/:search',auth,Data.getDataAbout)
module.exports=router