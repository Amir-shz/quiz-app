const score = JSON.parse(localStorage.getItem("score"));
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const scoreEle = document.querySelector("p");
const button = document.querySelector("button");
const input = document.querySelector("input");

scoreEle.innerText = score;

const saveHandler = () => {
  if (!score || !input.value) {
    alert("Invalid username or score");
  } else {
    const finalScore = { name: input.value, score };
    highScores.push(finalScore);
    console.log(highScores);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    localStorage.removeItem("score");
    window.location.assign("/index.html");
  }
};

button.addEventListener("click", saveHandler);
