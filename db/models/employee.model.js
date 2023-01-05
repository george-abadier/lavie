const mongoose = require('mongoose');
const jsonWebToken = require('jsonwebtoken')
const bcrybt = require('bcryptjs')
const validator=require('validator')
const employeeSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
        lowercase: true,
    },
    role: {
        type: mongoose.SchemaTypes.ObjectId,
        trim: true,
        required: true,
        ref: 'roles'
    },
    age: {
        type: Number,
        min: 18,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid email address')
            }
        }
    },
    status:{
        type:Boolean,
        default:false
    },
    date: {
        type: Date,
        default:new Date(),
        expires: 600
    },
    image: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        trim: true,
        lowercase: true,
        required: true,
        immutable:true
    },
    phoneNums: [{
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
    }],
    chats: [{
        with: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            trim: true,
            ref: 'users'
        },
        chat: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            trim: true,
            ref: 'chats'
        }
    }],
    tasks:[{
        task:{
            type:String,
            required:true,
        },
        completed:{
            type:Boolean,
            default:false
        }
    }]
    // targets: [{
    //     dateOfTarget:{
    //         type:Date,
    //         required:true
    //     },
    //     target: {
    //         type: Number,
    //         required:true,
    //     },
    //     achieved:{
    //         type:Boolean,
    //         default:false,
    //     }
    // }],
    // myAchievment:{
    //     type:Number,
    //     default:0
    // }
    // department:{
    //     type:mongoose.SchemaTypes.ObjectId,
    //     required:true,
    //     trim:true,
    //     ref:
    // }

})
employeeSchema.pre('save', function () {
    if (this.isModified('password')) this.password = bcrybt.hashSync(this.password)
})
employeeSchema.statics.logIn = async (email, enterdPassword) => {
    const userData = await employeeModel.findOne({ email })
    if (!userData) {
        throw new Error('invalid email')
    }
    if (!bcrybt.compareSync(enterdPassword, userData.password)) {
        throw new Error('invalid password')
    }
    return userData
}
employeeSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.__v
    delete userObject.password
    return userObject
}
const employeeModel=mongoose.model('employees',employeeSchema)
module.exports=employeeModel