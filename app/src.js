require('../db/connection')
require('./passport')
const cookieSession = require('cookie-session')
const passport = require('passport');
const express=require('express')
const app=express()
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session())

app.use(express.urlencoded({extended:true}))
app.use(express.json())
const employeeRoutes=require('../routes/employee.route')
const userRoutes=require('../routes/user.route')
const roleRoutes=require('../routes/role.route')
const productRoutes=require('../routes/products.route')
const plantRoutes=require('../routes/plant.route')
const cartRoutes=require('../routes/cart.route')
const dataRoutes=require('../routes/data,route')
app.use(dataRoutes)
app.use(cartRoutes)
app.use(plantRoutes)
app.use(productRoutes)
app.use(employeeRoutes)
app.use(userRoutes)
app.use(roleRoutes)
module.exports=app