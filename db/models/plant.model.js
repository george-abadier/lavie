const mongoose = require('mongoose')
const plantSchema = mongoose.Schema({
    name: {
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    forLevel:{
        type: String,
        enum: ['begginner', 'advanced', 'professional'],
        trim: true,
        lowercase: true,
        ref:'users'
    }
})
plantSchema.virtual('product',{
    ref:'products',
    localField:"_id",
    foreignField:"about"
})
// plantSchema.virtual('data',{
//     ref:'data',
//     localField:"_id",
//     foreignField:"plant"
// })
const plantModel = mongoose.model('plants', plantSchema)
module.exports=plantModel