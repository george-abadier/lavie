const mongoose=require('mongoose')
const dataSchema=mongoose.Schema({
    type:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        enum:['general','about plant']
    },
    plant:{
        type:mongoose.SchemaTypes.ObjectId,
        required:function type(){
            return (this.type=='about plant')
        },
        trim:true,
        ref:"plants"
    },
    forLevel:{
        type:String,
        required:function type(){
            return (this.type=='general')
        },
        enum:['beginner', 'advanced', 'professional'],
        ref:'users'
    },
    subject:{
        type:String,
        required:true,
    }

})
const dataModel=mongoose.model('data',dataSchema)
module.exports=dataModel