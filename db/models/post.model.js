const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
    userid: {
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'users'
    },
    content: {
        type: String,
        required: true,
        trim:true
    },
    file: {
        type: String,
    }
},
{
   timestramps:true
})
const postModel=mongoose.model('posts',postSchema)
module.exports=postModel