const Cart=require('../app/controller/cart.controller')
const { auth, authToThisRoute } = require('../app/mddleware')
const router=require('express').Router()
router.post('/lavie/addtocart',auth,Cart.addToCart)
router.put('/lavie/cartproduct/:product/:number',auth,Cart.updateProductNum)
router.get('/lavie/mycart',auth,Cart.getMyCart)
router.post('/lavie/cartconfirm/:id',auth,Cart.confirmCart)
router.get('/lavie/callbackcartconfirm/:token',Cart.confirmation)
module.exports=router