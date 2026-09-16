import React, { useState,useEffect } from "react"
import "../style/interview.scss"
import { useInterview } from "../hooks/useInterview"
import { useNavigate,useParams } from "react-router"

// ---- inline icons (no external icon-library dependency) -----------------
const CodeIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M8.5 7 3.5 12l5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const ChatIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 5.5h16v10.5H8.5L4 20V5.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M8 9.5h8M8 12.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
)

const RoadMapIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M6 20c0-4 4-3 4-7s-4-3-4-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M18 20c0-4-4-3-4-7s4-3 4-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="6" cy="4.3" r="1.3" fill="currentColor"/>
        <circle cx="18" cy="19.7" r="1.3" fill="currentColor"/>
    </svg>
)

const ChevronIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M8 10l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const BulbIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M9 18h6M10 21h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M12 3a6 6 0 0 0-3.2 11.1c.6.4 1 1 1.1 1.7l.1.7h4l.1-.7c.1-.7.5-1.3 1.1-1.7A6 6 0 0 0 12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
)

const NAV_ITEMS = [
    { key: "technical", label: "Technical Questions", icon: CodeIcon },
    { key: "behavioral", label: "Behavioral Questions", icon: ChatIcon },
    { key: "roadmap", label: "Road Map", icon: RoadMapIcon },
]

const SEVERITY_LABEL = {
    low: "Low",
    medium: "Medium",
    high: "High",
}

/**
 * ---------------------------------------------------------------------
 * UI LAYER — Interview
 * ---------------------------------------------------------------------
 * Purely presentational: report data arrives via the `report` prop and
 * everything else is local UI state (active section, expanded card).
 * Falls back to an empty-shaped report so `<Interview />` still renders
 * on its own until the hooks/api layer is wired up.
 *
 *   const InterviewPage = () => {
 *     const { report } = useInterviewReport()   // hooks layer
 *     return <Interview report={report} />
 *   }
 * ---------------------------------------------------------------------
 */
const Interview = ({
    // report = {
    //     matchScore: 0,
    //     technicalQuestions: [],
    //     behaviourQuestions: [],
    //     skillGap: [],
    //     preparationPlan: [],
    // },
}) => {
    const [activeSection, setActiveSection] = useState("technical")
    const [expandedId, setExpandedId] = useState(0)

    const {report} = useInterview()


    const {
        matchScore = 0,
        technicalQuestions = [],
        behaviourQuestions = [],
        skillGap = [],
        preparationPlan = [],
    } = report || {}

    const questionList = activeSection === "technical" ? technicalQuestions : behaviourQuestions

    const toggleExpanded = (index) => {
        setExpandedId((prev) => (prev === index ? -1 : index))
    }

    return (
        <main className="interview-page">
            <div className="interview-page__shell">
                {/* ---------------- left: navigation ---------------- */}
                <aside className="interview-nav">
                    <div className="interview-nav__score">
                        <span className="interview-nav__score-value">{matchScore}%</span>
                        <span className="interview-nav__score-label">Match Score</span>
                    </div>

                    <nav className="interview-nav__list">
                        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
                            <button
                                type="button"
                                key={key}
                                className={`interview-nav__item${activeSection === key ? " interview-nav__item--active" : ""}`}
                                onClick={() => setActiveSection(key)}
                            >
                                <Icon className="interview-nav__icon" />
                                <span>{label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* ---------------- center: main content ---------------- */}
                <section className="interview-content">
                    {activeSection !== "roadmap" ? (
                        <div className="question-list">
                            {questionList.length === 0 && (
                                <p className="interview-content__empty">No questions available yet.</p>
                            )}
                            {questionList.map((item, index) => {
                                const isOpen = expandedId === index
                                return (
                                    <article
                                        className={`question-card${isOpen ? " question-card--open" : ""}`}
                                        key={index}
                                    >
                                        <button
                                            type="button"
                                            className="question-card__head"
                                            onClick={() => toggleExpanded(index)}
                                        >
                                            <span className="question-card__index">{String(index + 1).padStart(2, "0")}</span>
                                            <span className="question-card__question">{item.question}</span>
                                            <ChevronIcon className="question-card__chevron" />
                                        </button>

                                        {isOpen && (
                                            <div className="question-card__body">
                                                <div className="question-card__block">
                                                    <p className="question-card__block-label">
                                                        <BulbIcon className="question-card__block-icon" />
                                                        Why it's asked
                                                    </p>
                                                    <p className="question-card__block-text">{item.intention}</p>
                                                </div>
                                                <div className="question-card__block">
                                                    <p className="question-card__block-label">Sample Answer</p>
                                                    <p className="question-card__block-text">{item.answer}</p>
                                                </div>
                                            </div>
                                        )}
                                    </article>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="roadmap-list">
                            {preparationPlan.length === 0 && (
                                <p className="interview-content__empty">No preparation plan available yet.</p>
                            )}
                            {preparationPlan.map((plan) => (
                                <article className="roadmap-card" key={plan.day}>
                                    <div className="roadmap-card__day">
                                        <span>Day</span>
                                        {plan.day}
                                    </div>
                                    <div className="roadmap-card__content">
                                        <h3 className="roadmap-card__focus">{plan.focus}</h3>
                                        <ul className="roadmap-card__tasks">
                                            {plan.tasks?.map((task, i) => (
                                                <li key={i}>{task}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {/* ---------------- right: skill gaps ---------------- */}
                <aside className="skill-gaps">
                    <h2 className="skill-gaps__heading">Skill Gaps</h2>
                    <div className="skill-gaps__list">
                        {skillGap.length === 0 && (
                            <p className="interview-content__empty">No skill gaps identified.</p>
                        )}
                        {skillGap.map((gap, index) => (
                            <span
                                className={`skill-pill skill-pill--${gap.severity || "low"}`}
                                key={index}
                                title={`${SEVERITY_LABEL[gap.severity] || "Low"} priority`}
                            >
                                {gap.skill}
                            </span>
                        ))}
                    </div>
                </aside>
            </div>
        </main>
    )
}

export default Interview
