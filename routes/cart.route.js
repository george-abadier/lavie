const Cart=require('../app/controller/cart.controller')
const { auth, authToThisRoute } = require('../app/mddleware')
const router=require('express').Router()
router.post('/lavie/addtocart',auth,authToThisRoute,Cart.addToCart)
module.exports=router