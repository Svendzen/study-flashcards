import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

const questions = [
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

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);

  function handleClick(id) {
    setSelectedId(id !== selectedId ? id : null);
  }

  return (
    <div className="flashcards">
      {questions.map((question) => (
        <div
          key={question.id}
          className="card-wrapper"
          onClick={() => handleClick(question.id)}
        >
          <div
            className={`card ${question.id === selectedId ? "selected" : ""}`}
          >
            <div className="card-face front">
              <p>{question.question}</p>
            </div>
            <div className="card-face back">
              <p>{question.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
