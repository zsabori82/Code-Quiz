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

