//**The following JavaScript code defines two functions (printHighscores and clearHighscores), it also includes some logic to display and clear high scores in a web page.**/


//This function retrieves high scores from the browser's local storage or sets an empty array if no scores are stored.
function printHighscores() {
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // Sorting the high scores in descending order based on the score property.
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function(score) {
    // Creating an li (list item) element for each high score, setting its content to the initials and score.
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // Appending each li element to an unordered list (ul) with the id "highscores" on the page.
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}
// The following function removes the "highscores" item from the local storage, effectively clearing the stored high scores.
// Later it reloads the page (window.location.reload()) to reflect the changes.
function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}
// The code bellow adds an event listener to the HTML element with the id "clear" (presumably a button). When the button is clicked, the clearHighscores function is called.
document.getElementById("clear").onclick = clearHighscores;

// Following line ensures that the printHighscores function is executed when the page loads, displaying the high scores.
printHighscores();