const input = document.getElementById("task");
input.addEventListener("keydown", checkInputWidth);

function checkInputWidth() {
  // Get the input element and warning message element

  const warningMessage = document.getElementById("warningMessage");

  // Get the current value of the input
  const inputValue = input.value;

  // Create a hidden off-screen element to measure text width
  const offscreenElement = document.createElement("div");
  offscreenElement.style.position = "absolute";
  offscreenElement.style.left = "-9999px";
  offscreenElement.style.font = window.getComputedStyle(input).font;
  offscreenElement.textContent = inputValue;
  document.body.appendChild(offscreenElement);

  // Get the width of the text
  const textWidth = offscreenElement.clientWidth;

  // Remove the off-screen element
  document.body.removeChild(offscreenElement);

  // Set the maximum width (215px)
  const maxWidth = 115;

  // Check if the text width exceeds the maximum width
  if (textWidth > maxWidth) {
    // Show the warning message
    warningMessage.style.display = "block";
    // Prevent further input
    input.value = inputValue.slice(0, inputValue.length - 1);
  } else {
    // Hide the warning message
    warningMessage.style.display = "none";
  }
}
