const Product=require('../app/controller/products controller')
const { authToThisRoute, auth } = require('../app/mddleware')
const router=require('express').Router()
router.post('/lavie/addproduct',auth,authToThisRoute,Product.add)
router.post('/lavie/rateproduct/:id',auth,authToThisRoute,Product.rate)
router.get('/lavie/showproductRating/:id',auth,authToThisRoute,Product.showProductRatings)
router.get('/lavie/blogmoreHelpful/:productID/:rateID',auth,authToThisRoute,Product.moreHelpful)
module.exports=router