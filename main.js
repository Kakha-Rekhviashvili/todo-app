const toDoList = [];
let activeResults = [];
let passiveResults = [];
const itemsLeft = document.getElementById("items-left");
const clearComplated = document.getElementById("clear-complated");

let unitBoxes;
const addComponent = document.getElementById("add-component");
const buttonsList = document.querySelectorAll("#bottonList > p");
const task = document.getElementById("task");
const complated = document.getElementById("completed");
const resultList = document.getElementById("resultList");
let buttonCompletedResults = document.getElementById("CompletedResults");
let buttonunCompletedResults = document.getElementById("unCompletedResults");
let buttonallResults = document.getElementById("allResults");
const warningMessage = document.getElementById("warningMessage");
let complatedTasksQuantity;

task.addEventListener("keydown", checkInputWidth);
addComponent.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addi();
    warningMessage.style.display = "none";
  }
});
clearComplated.addEventListener("click", removeAllComplate);

function addi() {
  if (task.value != "") {
    let activeName;
    toDoList.push([task.value, complated.checked, Math.random()]);
    for (let i = 0; i < buttonsList.length; i++) {
      if (buttonsList[i].classList.contains("active")) {
        activeName = `${buttonsList[i].id}()`;
      }
    }
    eval(activeName);

    task.value = "";
    complated.checked = false;
  }
}

function countActive() {
  for (i = toDoList.length - 1; i >= 0; i--) {
    if (toDoList[i][1] == true) {
      complatedTasksQuantity++;
    }
  }
  return complatedTasksQuantity;
}

function drawActive() {
  let complatedTasksQuantity = 0;
  for (i = toDoList.length - 1; i >= 0; i--) {
    if (toDoList[i][1] == false) {
      complatedTasksQuantity++;
    }
    itemsLeft.innerText = `Items left ${complatedTasksQuantity}`;
  }
}

function allResults() {
  activeButtonAddres(buttonallResults);
  clearHtml();
  complatedTasksQuantity = countActive();
  buildHtml(toDoList);
}

function CompletedResults() {
  activeButtonAddres(buttonCompletedResults);
  clearHtml();
  activeResults = toDoList.filter((item) => item[1] === true);
  complatedTasksQuantity = countActive();
  buildHtml(activeResults);
}

function unCompletedResults() {
  activeButtonAddres(buttonunCompletedResults);
  clearHtml();
  passiveResults = toDoList.filter((item) => item[1] === false);
  complatedTasksQuantity = countActive();
  buildHtml(passiveResults);
}

function removeAllComplate() {
  for (i = toDoList.length - 1; i >= 0; i--) {
    if (toDoList[i][1] == true) {
      toDoList.splice(i, 1);
    }
  }
  refreshList();
}

function remove() {
  for (i = 0; i < toDoList.length; i++) {
    if (this.value == toDoList[i][2]) {
      toDoList.splice(i, 1);
    }
  }
  refreshList();
}

function refreshList() {
  if (buttonsList[0].classList.contains("active")) {
    allResults();
  } else if (buttonsList[1].classList.contains("active")) {
    unCompletedResults();
  } else {
    CompletedResults();
  }
}

function buildHtml(inputList) {
  complatedTasksQuantity = 0;
  for (i = 0; i < inputList.length; i++) {
    const divElement = document.createElement("div");
    divElement.classList.add("unitbox");

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.checked = inputList[i][1];

    const pElement = document.createElement("p");
    pElement.classList.add("task-content");
    const pTask = document.createTextNode(inputList[i][0]);
    pElement.appendChild(pTask);

    const xElement = document.createElement("img");
    xElement.value = inputList[i][2];
    xElement.classList.add("x");
    xElement.src = "images/icon-cross.svg";

    resultList.appendChild(divElement);
    divElement.appendChild(checkboxElement);
    checkboxElement.style.float = "left";
    divElement.appendChild(pElement);
    pElement.style.float = "left";
    divElement.appendChild(xElement);
    xElement.style.float = "right";
    xElement.style.marginRight = "20px";
    if (checkboxElement.checked) {
      pElement.classList.add("gadaxazva");
    }

    checkboxElement.addEventListener("click", function () {
      complatedTasksQuantity = 0;
      for (i = 0; i < toDoList.length; i++) {
        if (xElement.value == toDoList[i][2]) {
          toDoList[i][1] = checkboxElement.checked;
        }
      }

      checkboxElement.parentElement.children[1].classList.toggle("gadaxazva");
      drawActive();
    });
    xElement.addEventListener("click", remove);
  }
  drawActive();
}

function clearHtml() {
  unitBoxes = document.querySelectorAll(".unitbox");
  if (unitBoxes.length > 0) {
    for (let i = 0; i < unitBoxes.length; i++) {
      unitBoxes[i].remove();
    }
  }
}

function activeButtonAddres(stateParam) {
  stateParam.classList.add("active");

  for (let i = 0; i < buttonsList.length; i++) {
    if (buttonsList[i] !== stateParam) {
      buttonsList[i].classList.remove("active");
    }
  }
}

if (typeof unitBoxes !== "undefined") {
  unitBoxes.foreach((box) => {
    box.addEventListener("click", function (event) {
      console.log(event);
    });
  });
}

function checkInputWidth() {
  const warningMessage = document.getElementById("warningMessage");
  const inputValue = task.value;
  const offscreenElement = document.createElement("div");
  offscreenElement.style.position = "absolute";
  offscreenElement.style.left = "-9999px";
  offscreenElement.style.font = window.getComputedStyle(task).font;
  offscreenElement.textContent = inputValue;
  document.body.appendChild(offscreenElement);
  const textWidth = offscreenElement.clientWidth;
  document.body.removeChild(offscreenElement);
  const maxWidth = 225;
  if (textWidth >= maxWidth) {
    warningMessage.style.display = "block";
    task.value = inputValue.slice(0, inputValue.length - 1);
  } else {
    warningMessage.style.display = "none";
  }
}
