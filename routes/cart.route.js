
const Cart=require('../app/controller/cart.controller')
const { auth, authToThisRoute } = require('../app/mddleware')
const router=require('express').Router()
//customer dealing with cart
router.post('/lavie/addtocart',auth,Cart.addToCart)
router.post('/lavie/cartproduct',auth,Cart.updateProductNum)
router.get('/lavie/mycart',auth,Cart.getMyCart)
router.post('/lavie/cartconfirm/:id',auth,Cart.confirmCart)
router.get('/lavie/resendcartconfirm/:id',auth,Cart.resendConfirmationMail)
router.put('/lavie/returnfromcartconfirm/:id',auth,Cart.returnToChange)
router.get('/lavie/callbackcartconfirm/:token',Cart.confirmation)
//employee dealing with cart
router.get('/lavie/cartsneedtobedone',auth,authToThisRoute,Cart.getCartTask)
router.put('/lavie/goforward/:id',auth,authToThisRoute,Cart.nextStep)

module.exports=router