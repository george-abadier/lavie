const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    about:{
         type:mongoose.SchemaTypes.ObjectId,
         required:true,
         trim:true,
         ref:'plants'
    },
    name: {
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    ratings:[{
        rate:{
            type:Number,
            min:1,
            max:5,
            required:true
        },
        rateComment:{
            type:String,
            required:true,
        },
        userID:{
            type:mongoose.SchemaTypes.ObjectId,
            required:true,
            trim:true,
            ref:'users'
        },
        helpful:{
            type:Number,
            default:0,
        }
    }]
})
const productModel = mongoose.model('products', productSchema)
module.exports=productModel