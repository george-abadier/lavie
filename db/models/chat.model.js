const mongoose=require('mongoose')
const Schema=mongoose.Schema({
messages:[{
    message:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        trim:true,
        ref:'users'
    },
    date:{
        type:Date,
        default:new Date()
    }
}]
})
const Model=mongoose.model('',Schema)