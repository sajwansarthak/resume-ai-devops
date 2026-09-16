import React,{ useState,useRef } from "react"
import "../style/home.scss"
import { useInterview } from "../hooks/useInterview"
import { useNavigate } from "react-router"

// ---- inline icons (no external icon-library dependency) -----------------
const BriefcaseIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
)

const UserIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M4.5 20c1.2-3.6 4.2-5.5 7.5-5.5s6.3 1.9 7.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
)

const UploadCloudIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M7 18a4.5 4.5 0 0 1-.5-8.98A5.5 5.5 0 0 1 17.3 8.06 4 4 0 0 1 17 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 11v7m0-7 2.5 2.5M12 11 9.5 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const SparkleIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.6L12 17.7l-1.6-5.5L5 10.6 10.4 9 12 3.5Z" fill="currentColor"/>
        <path d="M19 3.5 19.7 6l2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.5Z" fill="currentColor"/>
    </svg>
)

/**
 * ---------------------------------------------------------------------
 * UI LAYER — Home
 * ---------------------------------------------------------------------
 * Wired up to the `useInterview` hook for report generation/navigation.
 * Local UI state (form fields, drag state, selected file name) lives
 * here since it's presentational-but-interactive rather than shared
 * app state.
 * ---------------------------------------------------------------------
 */
const Home = () => {
    const { loading, generateReport, reports = [] } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [resumeFileName, setResumeFileName] = useState("")
    const [isDraggingResume, setIsDraggingResume] = useState(false)
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const canGenerate =
        !loading && jobDescription.trim().length > 0 && (resumeFileName || selfDescription.trim().length > 0)

    const setResumeFile = (file) => {
        if (!file) {
            setResumeFileName("")
            return
        }
        setResumeFileName(file.name)

        // keep the hidden file input in sync so generateReport can read
        // resumeInputRef.current.files[0], including drag & drop files
        if (resumeInputRef.current) {
            const dataTransfer = new DataTransfer()
            dataTransfer.items.add(file)
            resumeInputRef.current.files = dataTransfer.files
        }
    }

    const handleResumeChange = (e) => {
        setResumeFile(e.target.files?.[0])
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDraggingResume(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDraggingResume(false)
    }

    const handleResumeDrop = (e) => {
        e.preventDefault()
        setIsDraggingResume(false)
        setResumeFile(e.dataTransfer.files?.[0])
    }

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    return (
        <main className="home-page">
            <header className="home-page__header">
                <h1 className="home-page__title">
                    Create Your Custom <span className="home-page__title-accent">Interview Plan</span>
                </h1>
                <p className="home-page__subtitle">
                    Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                </p>
            </header>

            <div className="home-page__card">
                <div className="home-page__body">
                    {/* ---------------- left: job description ---------------- */}
                    <section className="job-panel">
                        <div className="job-panel__head">
                            <h2 className="job-panel__heading">
                                <BriefcaseIcon className="job-panel__icon" />
                                Target Job Description
                            </h2>
                            <span className="job-panel__badge">Required</span>
                        </div>

                        <div className="job-panel__field">
                            <textarea
                                onChange={(e) => setJobDescription(e.target.value)}
                                id="jobDescription"
                                name="jobDescription"
                                placeholder={"Paste the full job description here...\ne.g. \"Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...\""}
                                value={jobDescription}
                            />
                        </div>
                    </section>

                    {/* ---------------- right: profile ---------------- */}
                    <section className="profile-panel">
                        <h2 className="profile-panel__heading">
                            <UserIcon className="profile-panel__icon" />
                            Your Profile
                        </h2>

                        <div className="profile-panel__block">
                            <p className="profile-panel__label">
                                Upload Resume <span className="profile-panel__hint">(Best Results)</span>
                            </p>

                            <label
                                htmlFor="resume"
                                className={`resume-dropzone${isDraggingResume ? " resume-dropzone--active" : ""}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleResumeDrop}
                            >
                                <span className="resume-dropzone__icon-wrap">
                                    <UploadCloudIcon className="resume-dropzone__icon" />
                                </span>
                                <span className="resume-dropzone__title">
                                    {resumeFileName || "Click to upload or drag & drop"}
                                </span>
                                <span className="resume-dropzone__hint">PDF or DOCX (Max 5MB)</span>
                                <input
                                    ref={resumeInputRef}
                                    hidden
                                    type="file"
                                    name="resume"
                                    id="resume"
                                    accept=".pdf,.docx"
                                    onChange={handleResumeChange}
                                />
                            </label>
                        </div>

                        <div className="profile-panel__divider">
                            <span>OR</span>
                        </div>

                        <div className="profile-panel__block">
                            <p className="profile-panel__label">Quick Self-Description</p>
                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                id="selfDescription"
                                name="selfDescription"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                value={selfDescription}
                            />
                        </div>

                        <div className="info-banner">
                            <span className="info-banner__dot" />
                            <p className="info-banner__text">
                                Either a <strong>Resume</strong> or a <strong>Self Description</strong> is
                                required to generate a personalized plan.
                            </p>
                        </div>
                    </section>
                </div>

                <footer className="card-footer">
                    <p className="card-footer__hint">AI-Powered Strategy Generation • Approx 30s</p>
                    <button
                        type="button"
                        className="generate-button"
                        onClick={handleGenerateReport}
                        disabled={!canGenerate}
                    >
                        <SparkleIcon className="generate-button__icon" />
                        {loading ? "Generating..." : "Generate My Interview Strategy"}
                    </button>
                </footer>
            </div>

            {/* Recent Reports list */}
            {reports.length > 0 && (
                <section className="recent-reports">
                    <h2>My Recent Interview Plans</h2>
                    <ul className="reports-list">
                        {reports.map((report) => (
                            <li
                                key={report._id}
                                className="report-item"
                                onClick={() => navigate(`/interview/${report._id}`)}
                            >
                                <h3>{report.title || "Untitled Position"}</h3>
                                <p className="report-meta">
                                    Generated on{" "}
                                    {new Date(report.createdAt).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <nav className="home-page__links">
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms-of-service">Terms of Service</a>
                <a href="/help-center">Help Center</a>
            </nav>
        </main>
    )
}

export default Home