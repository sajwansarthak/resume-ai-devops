//Used for testing only 

const resume = `
Sarthak Sajwan
Jaipur, Rajasthan, India
sarthaksajwan@gmail.com
+91 9876543210
LinkedIn: linkedin.com/in/sarthaksajwan
GitHub: github.com/sajwansarthak

PROFESSIONAL SUMMARY

Highly motivated Full Stack MERN Developer and third-year Data Science student with hands-on experience building scalable web applications using React.js, Node.js, Express.js, and MongoDB. Passionate about Artificial Intelligence, REST APIs, authentication systems, and solving complex problems through clean and efficient code.

TECHNICAL SKILLS

Languages: JavaScript, TypeScript, Python, C++, SQL
Frontend: React.js, Tailwind CSS, HTML5, CSS3, Redux Toolkit
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
AI & ML: Gemini API, LangChain, Ollama
Tools: Git, GitHub, Postman, VS Code, Docker (Basic)
Concepts: JWT Authentication, REST APIs, MVC Architecture, Data Structures & Algorithms

EDUCATION

Bachelor of Technology (B.Tech) - Data Science
Manipal University Jaipur
Expected Graduation: 2027
CGPA: 7.82

PROJECTS

ResumeGeni AI
• Built an AI-powered resume analysis platform using MERN Stack and Gemini API.
• Generates ATS score, strengths, weaknesses, interview questions, and resume improvement suggestions.
• Implemented JWT Authentication and secure user management.

RAG PDF Chatbot
• Developed a Retrieval-Augmented Generation application using LangChain and Ollama.
• Users can upload PDF files and ask context-aware questions.
• Implemented semantic search using vector embeddings.

Full Stack Chat Application
• Built a real-time messaging application using Socket.io.
• Implemented authentication, online status, and instant messaging.

TECHNICAL EXPERIENCE

MERN Stack Development
• Developed REST APIs using Express.js and MongoDB.
• Built responsive user interfaces using React.js and Tailwind CSS.
• Implemented JWT Authentication with HTTP-only cookies.
• Followed MVC architecture and best coding practices.

CERTIFICATIONS

• GitHub Foundations Certification
• Supervised Machine Learning - DeepLearning.AI
• IBM Tools for Data Science
• NPTEL - Introduction to Operating Systems

ACHIEVEMENTS

• Solved 250+ Data Structures & Algorithms problems.
• Built multiple Full Stack MERN applications.
• Active GitHub contributor with several open-source repositories.

SOFT SKILLS

• Problem Solving
• Team Collaboration
• Communication
• Quick Learner
• Time Management

LANGUAGES

English
Hindi
`;

const selfDescription = `
ABOUT ME

I am a third-year B.Tech Data Science student with a strong passion for Full Stack Web Development and Artificial Intelligence. I enjoy building scalable and user-friendly applications that solve real-world problems.

MY STRENGTHS

• Strong problem-solving and analytical thinking.
• Fast learner with the ability to adapt to new technologies.
• Excellent debugging and logical reasoning skills.
• Team player with good communication skills.

TECHNICAL INTERESTS

• MERN Stack Development
• Artificial Intelligence
• Generative AI
• Backend Engineering
• REST API Development
• Authentication & Security
• Database Design
• Cloud Computing

CAREER GOALS

My goal is to become a skilled Software Engineer capable of building production-ready applications using modern technologies. I want to contribute to impactful products while continuously learning new tools, frameworks, and AI technologies.

WORKING STYLE

• Write clean and maintainable code.
• Follow industry best practices.
• Focus on performance and scalability.
• Continuously improve through learning and feedback.

WHY I AM A GOOD FIT

I combine strong technical fundamentals with a genuine enthusiasm for learning. I enjoy collaborating with teams, solving challenging engineering problems, and delivering high-quality software solutions that create real value.
`;

const jobDescription = `
JOB TITLE

Full Stack MERN Developer

COMPANY

TechNova Solutions Pvt. Ltd.

LOCATION

Bengaluru, India

JOB SUMMARY

We are looking for a passionate Full Stack MERN Developer to join our engineering team. The ideal candidate should have strong experience building scalable web applications using the MERN stack and should be comfortable working across both frontend and backend technologies.

RESPONSIBILITIES

• Develop responsive web applications using React.js.
• Design and build RESTful APIs using Node.js and Express.js.
• Work with MongoDB to design efficient database schemas.
• Implement secure authentication using JWT and HTTP-only cookies.
• Collaborate with UI/UX designers to build intuitive interfaces.
• Write clean, maintainable, and reusable code.
• Participate in code reviews and debugging sessions.
• Work in an Agile development environment.

REQUIRED SKILLS

Languages:
JavaScript, TypeScript

Frontend:
React.js, Redux Toolkit, Tailwind CSS

Backend:
Node.js, Express.js

Database:
MongoDB, Mongoose

Tools:
Git, GitHub, Postman, Docker

Concepts:
REST APIs
JWT Authentication
MVC Architecture
Data Structures & Algorithms
API Security

QUALIFICATIONS

• Bachelor's degree in Computer Science or related field.
• 1-3 years of experience in Full Stack Development.
• Strong communication and problem-solving skills.

PREFERRED QUALIFICATIONS

• Experience with AWS.
• Familiarity with CI/CD.
• Knowledge of Docker and Kubernetes.
• Experience integrating AI APIs such as Gemini or OpenAI.
`;

module.exports = {
    resume,
    selfDescription,
    jobDescription
}

//now we have to create a function which will take all three as input and will return a report with technical,behaviour questions,skill gaps and preparation plan
//For this we we'll require proper structure output