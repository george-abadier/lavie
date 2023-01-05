const mongoose = require('mongoose')
const answerSchema = mongoose.Schema({
    answer: {
        type: String,
        required: true,
    },
    rightAns: {
        type: Boolean,
        required
    }
})
const quizSchema = mongoose.Schema({
    forLevel: {
        type: String,
        enum: ['begginner', 'advanced', 'professional'],
        trim: true,
        lowercase: true,
        ref: 'users'
    },
    question: {
        type: String,
        required: true
    },
    answers: {
        type:[answerSchema],
        required:true,
        validate(value){
           let rightAnswers= value.filter(answer=>{return answer.rightAns})
           if(rightAnswers.length!=1){
            throw new Error('invalid answers')
           }
        }
    }
})
const quizModel = mongoose.model('quizzes', quizSchema)