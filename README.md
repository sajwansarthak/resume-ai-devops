# Resume Geni

An AI-powered interview preparation app that analyzes your resume, profile, and a target job description to generate a personalized interview strategy — including likely questions, skill gaps, and a day-by-day preparation plan.

## Features

- **User authentication** — Register, log in, and log out with JWT stored in HTTP-only cookies
- **Resume upload** — Upload a PDF resume or provide a quick self-description
- **AI interview reports** — Powered by Google Gemini, each report includes:
  - Job match score (0–100)
  - 10 technical interview questions with intent and sample answers
  - 8 behavioral interview questions with intent and sample answers
  - Skill gap analysis with severity levels
  - 14-day preparation roadmap
- **Report history** — View and revisit past interview plans from the home page

## Tech Stack

| Layer    | Technologies |
|----------|--------------|
| Frontend | React 19, Vite, React Router, Axios, Sass |
| Backend  | Node.js, Express 5, MongoDB (Mongoose) |
| AI       | Google Gemini (`@google/genai`) |
| Auth     | JWT, bcrypt, cookie-based sessions |

## Project Structure

```
resume-geni-project/
├── backend/
│   ├── server.js              # Entry point
│   └── src/
│       ├── app.js             # Express app & middleware
│       ├── config/            # Database connection
│       ├── controller/        # Route handlers
│       ├── middlewares/       # Auth & file upload
│       ├── models/            # Mongoose schemas
│       ├── routes/            # API routes
│       └── services/          # AI report generation
└── frontend/
    └── src/
        ├── features/
        │   ├── authentication/  # Login, register, auth context
        │   └── interview/       # Home, interview report pages
        └── app.routes.jsx       # React Router config
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/) (local instance or Atlas cluster)
- [Google AI Studio API key](https://aistudio.google.com/apikey) for Gemini

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd resume-geni-project
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/resume-geni
JWT_SECRET=your_jwt_secret_here
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
```

Start the backend server:

```bash
npm run dev
```

The API runs at `http://localhost:3000`.

### 3. Frontend setup

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## API Endpoints

### Authentication

| Method | Endpoint           | Description              | Access  |
|--------|--------------------|--------------------------|---------|
| POST   | `/api/auth/register` | Register a new user    | Public  |
| POST   | `/api/auth/login`    | Log in                 | Public  |
| GET    | `/api/auth/logout`   | Log out                | Public  |
| GET    | `/api/auth/get-me`   | Get current user       | Private |

### Interview Reports

| Method | Endpoint                          | Description                    | Access  |
|--------|-----------------------------------|--------------------------------|---------|
| POST   | `/api/interview`                  | Generate a new report          | Private |
| GET    | `/api/interview`                  | List all reports for the user  | Private |
| GET    | `/api/interview/report/:interviewId` | Get a report by ID          | Private |

## Usage

1. Open `http://localhost:5173` and create an account or log in.
2. On the home page, paste the target **job description**.
3. Upload your **resume** (PDF, max 3 MB) or write a **self-description**.
4. Click **Generate My Interview Strategy** and wait ~30 seconds.
5. Review your match score, practice questions, skill gaps, and 14-day roadmap.

## Scripts

### Backend

| Command       | Description                    |
|---------------|--------------------------------|
| `npm run dev` | Start server with nodemon      |

### Frontend

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start Vite dev server    |
| `npm run build` | Production build         |
| `npm run lint`  | Run Oxlint               |
| `npm run preview` | Preview production build |

## Environment Variables

| Variable               | Description                          |
|------------------------|--------------------------------------|
| `MONGO_URI`            | MongoDB connection string            |
| `JWT_SECRET`           | Secret key for signing JWT tokens    |
| `GOOGLE_GENAI_API_KEY` | API key for Google Gemini            |

## License

ISC
