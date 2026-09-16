const mongoose = require("mongoose")
const { string } = require("zod")


/**
 * -job description schema:string
 * -resume text:string
 * -Self description:string
 * -match Score : Number
 * 
 * Technical Questions and Answers :array format
 *          [{
 *              question: "",
 *              intention: "",
 *              answer
 *          }] 
 * Behaviour Questions :
 *           [{
 *              question: "",
 *              intention: "",
 *              answer
 *          }]
 * Skill Gaps : [{
 *   skill: "",
 *   severity: {
 *        type: String,
 *        enum: ['low','medium','high']
 * }
 * }]
 * Preparation plan ; [{
 *       day: Number,
 *       focus: String,
 *       tasks: [String]
 * }] array inside object
 * 
 * 
 * adding metadata is better like model comparison
 */

//Creating subSchemas

const technicalQuestionsSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true,"Technical question is required"]
    },
    intention:{
        type: String,
        required: [true,"Intention is required"]
    },
    answer:{
        type: String,
        required: [true,"Answer is required"]
    }
},{
    _id: false
})

const behaviourQuestionsSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true,"Technical question is required"]
    },
    intention:{
        type: String,
        required: [true,"Intention is required"]
    },
    answer:{
        type: String,
        required: [true,"Answer is required"]
    }
},{
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type: String,
        required: [true,"Skill is required"]
    },
    severity:{
        type: String,
        enum: ["low","medium","high"],
        required: [true, "severity is required"]
    }
},{
    _id: false,
})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required: [true,"Day is required"]
    },
    focus:{
        type: String,
        required: [true,"Focus is required"]
    },
    tasks: [{
        type:String,
        required: [true,"Task is required"]
    }]
},{
    _id: false
})


const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type: String,
        required: [true,"Job description is required"],
    },
    resume:{
        type: String,
    },
    selfDescription:{
        type: String,
    },
    matchScore:{
        type: Number,
        min: 0,
        max: 100,
    },
    //Creating it seperately code will look clean
    technicalQuestions:[technicalQuestionsSchema],
    behaviourQuestions: [behaviourQuestionsSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title:{
        type: String,
        required: [true, "Job title required"],
    },
},{
    timestamps: true
})

const interviewReportModel = mongoose.model("InterviewReport",interviewReportSchema);

module.exports = interviewReportModel;