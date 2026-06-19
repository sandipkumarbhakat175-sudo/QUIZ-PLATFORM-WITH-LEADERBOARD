// script.js

// ===== Select Elements =====
const startBtn = document.querySelector(".start-btn");
const popup = document.querySelector(".popup-i");
const exitBtn = document.querySelector(".exit-btn");
const continueBtn = document.querySelector(".continue-btn");

let quizContainer;
let currentQuestionIndex = 0;
let score = 0;
let playerName = "";

// ===== Event Handlers =====

// Show popup when Start Quiz is clicked
startBtn.addEventListener("click", () => {
    popup.classList.add("active");
});

// Hide popup when Exit Quiz is clicked
exitBtn.addEventListener("click", () => {
    popup.classList.remove("active");
});

// Continue button → start quiz
continueBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.remove("active");

    // Ask player name before starting
    playerName = prompt("Enter your name:") || "Guest";

    startQuiz();
});

// ===== Quiz Functions =====

function startQuiz() {
    quizContainer = document.createElement("div");
    quizContainer.classList.add("quiz-container");
    document.body.appendChild(quizContainer);

    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    quizContainer.innerHTML = "";

    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];

        // Question text
        const questionEl = document.createElement("h2");
        questionEl.textContent = q.question;
        quizContainer.appendChild(questionEl);

        // Options
        q.options.forEach(option => {
            const btn = document.createElement("button");
            btn.textContent = option;
            btn.classList.add("option-btn");
            btn.addEventListener("click", () => checkAnswer(option));
            quizContainer.appendChild(btn);
        });
    } else {
        showResult();
    }
}

function checkAnswer(selected) {
    if (selected === questions[currentQuestionIndex].answer) {
        score++;
    }
    currentQuestionIndex++;
    showQuestion();
}

function showResult() {
    quizContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>${playerName}, your score: ${score} / ${questions.length}</p>
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;

    saveToLeaderboard(playerName, score);
    showLeaderboard();
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// ===== Leaderboard =====

function saveToLeaderboard(name, score) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5); // keep top 5
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function showLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const title = document.createElement("h3");
    title.textContent = "Leaderboard (Top 5)";
    quizContainer.appendChild(title);

    const list = document.createElement("ul");
    list.classList.add("leaderboard");

    leaderboard.forEach(entry => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${entry.name}</strong> - ${entry.score}`;
        list.appendChild(li);
    });

    quizContainer.appendChild(list);
}
