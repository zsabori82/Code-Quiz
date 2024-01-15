//**The following JavaScript code defines two functions (printHighscores and clearHighscores), it also includes some logic to display and clear high scores in a web page.**/


//This function retrieves high scores from the browser's local storage or sets an empty array if no scores are stored.
function printHighscores() {
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // Sorting the high scores in descending order based on the score property.
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

 