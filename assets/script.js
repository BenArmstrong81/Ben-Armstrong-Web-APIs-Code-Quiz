// Global variables:
var beginQuiz = document.querySelector("#beginBtn");
var leaderBtn = document.querySelector("#leaderBtn");
var timerDisplay = document.querySelector(".timer");
var gameCard = document.querySelector("#gameCard");
var question = document.querySelector("#question");
var multiplechoiceA = document.querySelector("#multiple-choice-A");
var multiplechoiceB = document.querySelector("#multiple-choice-B");
var multiplechoiceC = document.querySelector("#multiple-choice-C");
var multiplechoiceD = document.querySelector("#multiple-choice-D");
var answer = document.querySelector("#answer");
var feedback = document.querySelector("#feedback1");
var card = document.querySelector("#multipleChoice");
var inputForm = document.querySelector("#inputForm");
var scoreCard = document.querySelector("#scoreCard");
var scoreBtn = document.querySelector("#scoreBtn");
var initialsBox = document.querySelector("#initialsBox");
var submitBtn = document.querySelector("#submitBtn");
var backBtn = document.querySelector("#backBtn");
var clearBtn = document.querySelector("#clearBtn");
var start = document.querySelector(".start");

// List of Questions, the muliple choice answers and the correct answer:
var questionChoice = [
    {
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        choices: ["if (i != 5)", "if (i <> 5)", "if i =! 5 then", "if i <> 5"],
        answer: "if (i != 5)"
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "Which one of these is not among the three different types of errors in JavaScript?",
        choices: ["Animation time errors", "Load time errors", "Run time errors", "Logical Errors"],
        answer: "Animation time errors"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<script>", "<js>", "<javascript>", "All of the above"],
        answer: "<script>"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question:
            "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        question:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log",
    },
    {
        question: "What is the type of Pop up boxes available in JavaScript?:",
        choices: ["Alert", "Confirm", "Prompt", "All the above"],
        answer: "All the above"
    }
];
var timeLeft = questionChoice.length * 20;
var q = 0;
var s = 0;
var score = 0;
var scoreList = [];
var timeInterval;
getScore();

// -----------------------------------------------------------------------------

// Running the timer for the quiz
function timer() {
  timeInterval = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = "TIMER: " + timeLeft;

    if (timeLeft === 0 || q >= questionChoice.length) {
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}
// -----------------------------------------------------------------------------

// Displaying questions & answers from questionChoice
function displayQA() {
  if (q < questionChoice.length) {
    question.textContent = questionChoice[q].question;
    multiplechoiceA.textContent = questionChoice[q].choices[0];
    multiplechoiceB.textContent = questionChoice[q].choices[1];
    multiplechoiceC.textContent = questionChoice[q].choices[2];
    multiplechoiceD.textContent = questionChoice[q].choices[3];
  } else {
    gameOver();
  }
}
// -----------------------------------------------------------------------------

// Informing player if chosen answer is right or wrong
function compareAnswer(event) {
  if (q >= questionChoice.length) {
    gameOver();
    clearInterval(timeInterval);
  } else {
    if (event === questionChoice[q].answer) {
      feedback1.textContent = "Well done! You are correct 🥳";
    } else {
      timeLeft -= 10;
      feedback1.textContent = "🤦‍♂️ You are Wrong! 🙄";
    }
    score = timeLeft;
    q++;
    displayQA();
  }
}
// -----------------------------------------------------------------------------

// Getting scores from local storage
function getScore() {
  var storedScore = JSON.parse(localStorage.getItem("highScore"));
  if (storedScore !== null) {
    scoreList = storedScore;
  }
}
// -----------------------------------------------------------------------------

// Saving the scores to local storage
function saveScore() {
  localStorage.setItem("highScore", JSON.stringify(scoreList));
}
// -----------------------------------------------------------------------------

// Displaying & hiding page items based on Game Over
function gameOver() {
  scoreBtn.innerHTML = score;
  scoreBtn.style.display = "inline-block";
  gameCard.classList.add("hide");
  inputForm.classList.remove("hide");
  timerDisplay.classList.add("hide");
  leaderBtn.classList.add("hide");
  leaderBoard();
}
// -----------------------------------------------------------------------------

// Keeping track of top 10 leaders from local storage w/ loop
function leaderBoard() {
  removeFromLeaderBoard();
  addToLeaderBoard();
  scoreList.sort((a, b) => {
    return b.score - a.score;
  });
  //only render the top 4 scores.
  topTen = scoreList.slice(0, 10);

  for (var i = 0; i < topTen.length; i++) {
    var player = topTen[i].player;
    var score = topTen[i].score;

    var newDiv = document.createElement("div");
    leaderBoardDiv.appendChild(newDiv);

    var newLabel = document.createElement("label");
    newLabel.textContent = player + " - " + score;
    newDiv.appendChild(newLabel);
  }
}
// -----------------------------------------------------------------------------

// Adding player initials to leader board
function addToLeaderBoard() {
  leaderBoardDiv = document.createElement("div");
  leaderBoardDiv.setAttribute("id", "playerInitials");
  document.getElementById("leaderBoard").appendChild(leaderBoardDiv);
}
// -----------------------------------------------------------------------------

// Removing player initials from leader board
function removeFromLeaderBoard() {
  var removeScores = document.getElementById("playerInitials");
  if (removeScores !== null) {
    removeScores.remove();
  } else {
  }
}
// -----------------------------------------------------------------------------

// Event listeners
beginQuiz.addEventListener("click", function (event) {
  timer();
  displayQA();
  start.classList.add("hide");
  gameCard.classList.remove("hide");
  leaderBtn.style.display = "none";
  scoreCard.classList.add("hide");
});

card.addEventListener("click", function (event) {
  var event = event.target;
  compareAnswer(event.textContent.trim());
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var playerInitials = initialsBox.value.trim();
  var newScore = {
    player: playerInitials,
    score: score,
  };
  
  scoreList.push(newScore);
  saveScore();
  leaderBoard();
  inputForm.classList.add("hide");
  scoreCard.classList.remove("hide");
});

leaderBtn.addEventListener("click", function (event) {
  scoreCard.classList.remove("hide");
  leaderBtn.classList.add("hide");
  start.classList.add("hide");
  leaderBoard();
});

// Event listener for go back button ??
backBtn.addEventListener("click", function (event) {
  location.reload();
});

// Event listener for clear scores button ??
clearBtn.addEventListener("click", function (event) {
  scoreList = [];
  start.classList.add("hide");
  localStorage.setItem("highScore", JSON.stringify(scoreList));
  leaderBoard();
  saveScore();
});