//multer is required to handle files -> multer setup inside middleware

const generateInterviewReport = require("../services/ai.service") 
const pdfParse = require("pdf-parse")
const interviewReportModel = require("../models/interviewReport.model")
const interviewRouter = require("../routes/interview.routes")


/**
 * @description Controller to generate interview report based on user self-description , job-description and resume
 */
async function generateInterviewReportController(req,res){
    //we'll use pdf-parse package to get the content out of the resume-file
    const resumeFile = req.file

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription,jobDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    //For checking
    //console.dir(interviewReportByAi, { depth: null });

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        title: interviewReportByAi.title,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        //destructuring interviewReport for the technical question
        ...interviewReportByAi
    })

    res.status(201).json({
        message:"Interview report generated successfully",
        interviewReport
    })

}

/**
 * @description controller to get interview report by interviewId
 */
async function getInterviewReportByIdController(req,res){
    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    res.status(200).json({
        messgae: "Interview report generated successfully",
        interviewReport
    })
}

/**
 * @description Controller to get all the interview of logged-in user
 */
async function getAllInterviewController(req,res){
    const interviewReports = await interviewReportModel.find({user: req.user.id}).sort({ createdAt: -1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestion -behaviourQuestions -skillGap -preparationPlan")
    res.status(200).json({
        message: "All interview reports fetched successfully.",
        interviewReports
    })
}

module.exports = {generateInterviewReportController,getInterviewReportByIdController,getAllInterviewController}