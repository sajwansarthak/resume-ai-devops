const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

// async function invokeGeminiAi (){
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: "Hello gemini ! Explain what is Interview ?"
//  ibe
//     console.log(response.text)
// }


//we are creating this for ai so that it can properly understand what we want as output and whats the input for -> This is basically recepie schema
const interviewReportScehma = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how will the candidate's profile is"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical questions that can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking the question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approcah to take etc."),
    })).describe("Technical questions that can be asked in the interview along with the intention"),
    behaviourQuestions: z.array(z.object({
        question: z.string().describe("The technical questions that can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking the question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approcah to take etc."),
    })).describe("Behavioural questions that can be asked in the interview along with the intention"),
    skillGap: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low","medium","high"]).describe("The severity of the skill gap.")
    })).describe("list of skill gap in the candidate's profile along with the severity."),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day in the preparation plan. Starting from 1"),
        focus: z.string().describe("The main focus of this day in preparation plan"),
        tasks: z.array(z.string()).describe("List of taks to be done on this day"),
    })).describe("A day-wise preparation plan for the candidate to follow in order to get hired"),
    title: z.string().describe("The title of the job for which the interview report is genereated"),
    
})

async function generateInterviewReport ({ resume, selfDescription, jobDescription }){

    const prompt = `

    You are a Senior Software Engineering Interviewer.
    
    Analyze the candidate's resume, self description, and job description.
    
    Return ONLY valid JSON.
    
    The JSON MUST have EXACTLY this structure:
    
    {
      "title": "",
    
      "matchScore": 0,
    
      "technicalQuestions": [
    
        {
    
          "question": "",
    
          "intention": "",
    
          "answer": ""
    
        }
    
      ],
    
      "behaviourQuestions": [
    
        {
    
          "question": "",
    
          "intention": "",
    
          "answer": ""
    
        }
    
      ],
    
      "skillGap": [
    
        {
    
          "skill": "",
    
          "severity": "low"
    
        }
    
      ],
    
      "preparationPlan": [
    
        {
    
          "day": 1,
    
          "focus": "",
    
          "tasks": [
    
            "",
    
            ""
    
          ]
    
        }
    
      ]
    
    }
    
    Requirements:

    - title should be the job title extracted from the job description.
    
    - matchScore should be between 0 and 100.
    
    - Generate EXACTLY 10 technicalQuestions.
    
    - Each technical question must include:
    
      - question
    
      - intention
    
      - answer
    
    - Generate EXACTLY 8 behaviourQuestions.
    
    - Each behavioural question must include:
    
      - question
    
      - intention
    
      - answer
    
    - Generate AT LEAST 5 skillGap objects.
    
    - Each skill gap must contain:
    
      - skill
    
      - severity (low, medium, or high)
    
    - Generate a 14-day preparationPlan.
    
    - Each day must contain:
    
      - day
    
      - focus
    
      - tasks (minimum 2 tasks)
    
    DO NOT return arrays of strings.
    
    DO NOT omit any field.
    
    DO NOT include markdown or explanation.
    
    Resume:
    
    ${resume}
    
    Self Description:
    
    ${selfDescription}
    
    Job Description:
    
    ${jobDescription}
    
    `;


    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config:{
            responseMimeType: "application/json",
            //responseSchema: zodToJsonSchema(interviewReportScehma),

        }
    })
    const report = JSON.parse(response.text)
    console.log(report)
    return report
}

module.exports = generateInterviewReport