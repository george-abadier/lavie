const mongoose = require('mongoose')
const validator = require('validator')
const locationSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['home', 'work'],
        required: true,
        trim: true,
        lowercase: true
    },
    address: {
        type: String,
        required: true,
        minlength: 10,
        trim: true,
        lowercase: true
    }
})
const phoneNumberSchema = mongoose.Schema({
    number: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isMobilePhone(value, "ar-EG"))
                throw new Error("invalid number")
        }
    },
    type: {
        type: String,
        enum: ['home', 'work', 'personal'],
        trim: true,
        lowercase: true
    }
})
const cartSchema = mongoose.Schema({
    fullname: {
        type: String,
        // required: true,
        trim: true,
        minlength: 7,
        lowercase: true,
    },
    location: {
        type: locationSchema,
        // required: true
    },
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        trim: true,
        refPath:'cartOwnerType'
    }, 
    cartOwnerType:{
        type:String,
        enum:['users','employees'],
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid email address')
            }
        }
    },
    phoneNumbers:{
        type:[phoneNumberSchema],
        // required:true,
        validate(value){
            // if(value.length<2){
            //     throw new Error('you must enter two numbers at least')
            // }
        }
    },
    paymentMethod:{
        type:String,
        // required:true,
        enum:['cash','credit'],
        trim:true,
        lowercase:true,

    },
    // verification:{
    //     type:Boolean,
    //     default:false,
    // },
    status:{
        type:String,
        enum:['not completed','verification mode','is being prepared','in its way','received'],
        default:'not completed',
        trim:true,
        lowercase:true,
    },
    totalPrice:{
        type:Number,
        default:0
    }
    ,
    products:[{
        product:{
            type:mongoose.SchemaTypes.ObjectId,
            trim:true,
            required:true,
            ref:'products'
        },
        number:{
            type:Number,
            required:true,
            min:1
        }
    }]
})
// cartSchema.method.isCompleted = function () {
//     return this.completed
// }
const cartModel = mongoose.model('carts', cartSchema)
module.exports=cartModel