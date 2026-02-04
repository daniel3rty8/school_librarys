// ================= IMPORTS =================
import { hide_show } from "./hide_show.js";
import { physicsQuizzes } from "./subject_quetions/physics.js";
import { mathQuizzes } from "./subject_quetions/maths.js";
import { chemQuizzes } from "./subject_quetions/chemistry.js";
import {bioQuizzes} from "./subject_quetions/biology.js";

// ================= NAV =================
const middle_div = document.getElementById("middle_div");
const container = document.getElementById("container");
const login_div = document.getElementById("login_div") || document.createElement("div");

hide_show(middle_div, login_div, container);

// ================= QUIZ CONTAINER =================
const quizContainer = document.getElementById("quiz_container");

// ALWAYS render something first (NO BLANK PAGE)
quizContainer.innerHTML = `
  <div class="loading">
    <h2>Loading quiz…</h2>
    <p>Please wait</p>
  </div>
`;

// ================= URL PARAMS =================
const params = new URLSearchParams(window.location.search);
const subject = params.get("subject"); // physics | maths | chem
const grade = params.get("grade");     // grade10 | grade11

// ================= QUIZ STATE =================
let selectedQuiz = [];
let currentIndex = 0;
let userAnswers = [];

// ================= ALL QUIZZES =================
const allQuizzes = {
  physics: physicsQuizzes,
  maths: mathQuizzes,
  chem: chemQuizzes,
  biology: bioQuizzes

};

// ================= ERROR RENDER =================
function renderError(message) {
  quizContainer.innerHTML = `
    <div class="error-box">
      <h2>⚠ Quiz Not Available</h2>
      <p>${message}</p>
      <button class="back-btn" onclick="window.history.back()">← Go Back</button>
    </div>
  `;
}

// ================= LOAD QUIZ =================
const subjectObj = allQuizzes[subject];

if (!subjectObj) {
  renderError("This subject does not exist.");
} else if (!subjectObj[grade]) {
  renderError("This grade quiz is not available.");
} else {
  selectedQuiz = subjectObj[grade];
  currentIndex = 0;
  renderQuestion();
}

// ================= RENDER QUESTION =================

function renderQuestion() {
  const q = selectedQuiz[currentIndex];

  quizContainer.innerHTML = `
    <div class="quiz-question">
    <h2 class="quiz_header">${grade.replace("grade", "Grade ")} ${subject.toUpperCase()} Quiz</h2>
      <p> <span class="question_no">${currentIndex + 1}.</span> ${q.question}</p>

      <div class="options">
        ${q.options
      .map(
        (opt, i) => `
              <button class="option-btn ${userAnswers[currentIndex] === i ? "selected" : ""
          }" data-index="${i}">
                ${opt}
              </button>
            `
      )
      .join("")}
      </div>

      <div class="btn">
        <button id="prev" ${currentIndex === 0 ? "disabled" : ""}>
          ← Previous
        </button>

        <button id="next">
          ${currentIndex === selectedQuiz.length - 1 ? "Finish" : "Next →"}
        </button>
      </div>
        <p class="quiz_count"> ${currentIndex + 1} of ${selectedQuiz.length} Question</p>
     
    </div>
  `;

  const optionButtons = quizContainer.querySelectorAll(".option-btn");

  // Reapply previous selection and color
  optionButtons.forEach(btn => {
    const idx = Number(btn.dataset.index);
    const chosen = userAnswers[currentIndex];
    const correct = q.answer;

    if (chosen !== undefined) {
      btn.disabled = true;
      if (idx === correct) {
        btn.style.backgroundColor = "#4CAF50"; // Green
      } else if (idx === chosen && chosen !== correct) {
        btn.style.backgroundColor = "#f71f10ff"; // Red
      }
    }


    // Add click listener only if not previously answered
    if (chosen === undefined) {
      btn.addEventListener("click", () => {
        userAnswers[currentIndex] = idx;

        optionButtons.forEach(b => {
          const i = Number(b.dataset.index);
          if (i === q.answer) b.style.backgroundColor = "#4CAF50";
          else if (i === idx && idx !== q.answer) b.style.backgroundColor = "#f71f10ff";
          b.disabled = true;
        });
      });
    }
  });

  document.getElementById("next").onclick = () => {
    if (currentIndex < selectedQuiz.length - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      showResult();
    }
  };

  document.getElementById("prev").onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion();
    }
  };
}
// ================= SHOW RESULT =================
function showResult() {
  let score = 0;
  selectedQuiz.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });
  quizContainer.innerHTML = `
    <div class="result-box">
      <h2>Your Score: ${score} / ${selectedQuiz.length}</h2>
      <p>You answered ${((score / selectedQuiz.length) * 100).toFixed(2)}% questions correctly.</p>
       
      <a href="quiz.html" class="back-btn">← Back to quizzes</a>
      <a class="back-btn" id="retry-btn">↻ Try Again <a>
    </div>
  `;
  document.getElementById("retry-btn").onclick = () => {
    currentIndex = 0;
    userAnswers = [];
    renderQuestion();
  };
}