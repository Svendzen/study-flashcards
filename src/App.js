import { useState, createContext, useContext } from "react";
import "./styles.css";

const initialQuestions = [
  {
    id: 1,
    question: "What are the three primary research approaches?",
    answer: "Qualitative, Quantitative, and Mixed Methods.",
  },
  {
    id: 2,
    question: "What is the main focus of qualitative research?",
    answer:
      "Understanding the meaning individuals or groups assign to a social or human problem through open-ended data collection.",
  },
  {
    id: 3,
    question:
      "How does quantitative research approach data collection and analysis?",
    answer:
      "Quantitative research tests objective theories by examining relationships among variables, using numerical data and statistical analysis.",
  },
  {
    id: 4,
    question: "What is mixed methods research?",
    answer:
      "An approach that combines both qualitative and quantitative data to provide a more comprehensive understanding of a research problem.",
  },
  {
    id: 5,
    question:
      "Which philosophical worldview is commonly associated with quantitative research?",
    answer: "Postpositivism",
  },
  {
    id: 6,
    question:
      "What is the main goal of constructivism in qualitative research?",
    answer:
      "To understand the complexity of multiple participant meanings and social interactions.",
  },
];

// Create a context for flashcards
const FlashcardsContext = createContext();

function useFlashcardsContext() {
  return useContext(FlashcardsContext);
}

export default function App() {
  // Move flashcards state to App component
  const [flashcards, setFlashcards] = useState(initialQuestions);

  function addFlashcard({ question, answer }) {
    const newFlashcard = {
      id: flashcards.length + 1,
      question,
      answer,
    };
    setFlashcards([...flashcards, newFlashcard]);
  }

  return (
    <FlashcardsContext.Provider value={{ addFlashcard }}>
      <div className="App">
        <Navbar />
        <FlashCardsList flashcards={flashcards} />
      </div>
    </FlashcardsContext.Provider>
  );
}

// Navbar component
function Navbar() {
  const [showForm, setShowForm] = useState(false);

  return (
    <nav className="navbar">
      <h1 className="app-title">Study Flashcards</h1>
      <div className="nav-links">
        <button
          className="nav-button"
          onClick={() => setShowForm(true)}
          aria-label="Add a new flashcard"
        >
          Add Flashcard
        </button>
      </div>
      {showForm && <AddFlashcardForm onClose={() => setShowForm(false)} />}
    </nav>
  );
}

// AddFlashcardForm component
function AddFlashcardForm({ onClose }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Access the addFlashcard function from context
  const { addFlashcard } = useFlashcardsContext();

  function handleSubmit(e) {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      addFlashcard({ question, answer });
      setQuestion("");
      setAnswer("");
      onClose();
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <h2>Add New Flashcard</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="question">Question:</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <label htmlFor="answer">Answer:</label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <div className="modal-buttons">
            <button type="submit" className="modal-button">
              Add
            </button>
            <button
              type="button"
              className="modal-button cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// FlashCardsList component
function FlashCardsList({ flashcards }) {
  const [selectedId, setSelectedId] = useState(null);

  function handleClick(id) {
    setSelectedId(id !== selectedId ? id : null);
  }

  return (
    <div className="flashcards">
      {flashcards.map((flashcard) => (
        <FlashCard
          key={flashcard.id}
          question={flashcard}
          isSelected={flashcard.id === selectedId}
          onClick={() => handleClick(flashcard.id)}
        />
      ))}
    </div>
  );
}

// FlashCard component
function FlashCard({ question, isSelected, onClick }) {
  return (
    <div
      className="card-wrapper"
      onClick={onClick}
      tabIndex="0"
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      aria-label={`Flashcard ${question.id}`}
    >
      <div className={`card ${isSelected ? "selected" : ""}`}>
        <div className="card-face">
          <p>{question.question}</p>
        </div>
        <div className="card-face back">
          <p>{question.answer}</p>
        </div>
      </div>
    </div>
  );
}
