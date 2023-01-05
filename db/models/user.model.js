const mongoose = require('mongoose');
const validator = require('validator')
const bcrybt = require('bcryptjs')
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        maxlength: 30,
        lowercase: true,
    },
    fullName: {
        type: String,
        trim: true,
        minlength: 7,
        lowercase: true,
    },
    role: {
        type: mongoose.SchemaTypes.ObjectId,
        default: '63b35526685484a36b4889c2',
        immutable: true,
        ref: 'roles'
    },
    age: Number,
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
        lowercase: true
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
    level: {
        type: String,
        enum: ['begginner', 'advanced', 'professional'],
        trim: true,
        lowercase: true,
    },
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
    quizzes: [{
        date: {
            type: Date,
            required: true,
        },
        rsault: {
            type: Boolean,
            required: true
        }
    }],
    notifications: [{
        date: {
            type: Date,
            required: true,
        },
        message: {
            type: String,
            trim: true,
            required: true,

        }
    }],
    liked: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        ref:'products'
    },
    points: {
        type: Number,
        default: 0,
    },
    verificationCode: String,
})
userSchema.pre('save', function () {
    if (this.isModified('password')) this.password = bcrybt.hashSync(this.password)
})
userSchema.statics.logIn = async (email, enterdPassword) => {
    const userData = await user.findOne({ email })
    if (!userData) {
        throw new Error('invalid email')
    }
    if (!bcrybt.compareSync(enterdPassword, userData.password)) {
        throw new Error('invalid password')
    }
    return userData
}
userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.__v
    delete userObject.password
    return userObject
}
const user=mongoose.model('users', userSchema)
module.exports = user