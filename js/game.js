import formatData from "./helper.js";

const level = localStorage.getItem("level") || "medium";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const questionNumber = document.getElementById("question-number");
const error = document.getElementById("error");

const CORRECT_BONUS = 10;
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    formattedData = formatData(json.results);
    start();
  } catch (err) {
    loader.style.display = "none";
    error.style.display = "block";
  }
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  questionNumber.innerText = questionIndex + 1;
  const { answers, question, correctAnswerIndex } =
    formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  questionText.innerHTML = question;
  answerList.forEach((item, index) => {
    item.innerHTML = answers[index];
  });
};

const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;

  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

const nextHandler = () => {
  if (questionIndex < formattedData.length - 1) {
    questionIndex++;
    isAccepted = true;
    removeClasses();
    showQuestion();
  } else {
    finishHandler();
  }
};

const removeClasses = () => {
  answerList.forEach((item) => {
    item.classList.remove("incorrect", "correct");
  });
};

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("../end.html");
};

window.addEventListener("load", fetchData);
nextButton.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);
answerList.forEach((item, index) => {
  // const handler = () => {
  //   checkAnswer(index);
  // };
  // item.addEventListener("click", handler);
  item.addEventListener("click", (event) => checkAnswer(event, index));
});
