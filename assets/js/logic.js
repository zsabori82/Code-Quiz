// Quiz application, displaying questions, handling user responses and tracking time

// Retrieving references to various HTML elements by their IDs using document.querySelector.(DOM elements)
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
// Quiz state variables:
// 1- Keeping track of the index of the current question in the questions array(currentQuestionIndex).
var currentQuestionIndex = 0;
// 2- time: Represents the remaining time for the quiz, initialized based on the number of questions.
var time = questions.length * 15;
// 3- timerId: Stores the identifier returned by setInterval for the timer.
var timerId;
// creating function to be called when the user clicks the start button.
function startQuiz() {
  // Hide the start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // Un-hide questions section
  questionsEl.removeAttribute("class");

  // Start timer
  timerId = setInterval(clockTick, 1000);

  // Show starting time
  timerEl.textContent = time;

  getQuestion();
}
//** Next function populates the interface with the current question and its choices.It dynamically creates buttons for each choice and sets up click event listeners to handle user responses. */
function getQuestion() {
  // Get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // Update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // Clear out any old question choices
  choicesEl.innerHTML = "";

  // Loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // Create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // display on the page
    choicesEl.appendChild(choiceNode);
  });
}
//** Following function will be executed when a user clicks on a choice button.It checks if the user's choice is correct, penalizes time for a wrong answer, provides feedback, and then either proceeds to the next question or ends the quiz. */
function questionClick() {
  // Check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // Penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    // Display new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "400%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "400%";
  }

  // Flash right/wrong feedback
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // Next question
  currentQuestionIndex++;

  // Time checker
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}
// This function is called when the quiz ends (either time runs out or all questions are answered).It stops the timer, displays the end screen with the final score, and hides the questions section.
function quizEnd() {
  // Stop timer
  clearInterval(timerId);

  // Show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // Show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // Hide questions section
  questionsEl.setAttribute("class", "hide");
}
//**This function is called every second by the timer.It updates the time display and checks if the user has run out of time, triggering the end of the quiz. */

function clockTick() {
  // Update time
  time--;
  timerEl.textContent = time;

  // Check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}
//** Functions to save the user's high score and handling the Enter key press for submitting initials. */

function saveHighscore() {
  // Get value of input box
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // Get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // Save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // Redirect to next page
    window.location.href = "score.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// Submit initials
submitBtn.onclick = saveHighscore;

// Start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;