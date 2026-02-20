// Variables
const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");
const addButton = document.getElementById("addButton");
const span = document.querySelector(".close");
const modal = document.getElementById("myModal");
const modalContent = document.querySelector(".modal-content");
const taskInfo = document.getElementById("task");
const submitButton = document.getElementById("submitButton");
const toDoBlock = document.getElementById("list1");

for (const card of cards) {
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);
}

for (const list of lists) {
  list.addEventListener("dragover", dragOver);
  list.addEventListener("dragenter", dragEnter);
  list.addEventListener("dragleave", dragLeave);
  list.addEventListener("drop", dragDrop);
}

function dragStart(e) {
  // Allows the drop location to know which element is being moved when released
  e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd() {
  console.log("drag ended");
}

function dragOver(e) {
  // By default browsers don't allow you to drop elements on other elements. Which this then allows
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add("over");
}

function dragLeave(e) {
  this.classList.remove("over");
}

function dragDrop(e) {
  const id = e.dataTransfer.getData("text/plain");

  const card = document.getElementById(id);

  this.appendChild(card);

  this.classList.remove("over");
}

// Modal Functions & Events

addButton.addEventListener("click", openModal);
span.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    closeModal();
  }
});

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

// Modal - Submitting a Task

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  //Trims any white space and makes sure there is info in the textbox
  const newTaskInfo = taskInfo.value.trim();
  if (!newTaskInfo) return;

  //Resets Task Menu
  taskInfo.value = "";
  closeModal();

  //Creates the new task, adds it class for styling, properties, and text.
  const taskBlock = document.createElement("div");
  taskBlock.classList.add("card");
  taskBlock.id = "card" + Date.now();
  taskBlock.setAttribute("draggable", true);
  taskBlock.innerText = newTaskInfo;

  // Attaches drag events directly to Element
  taskBlock.addEventListener("dragstart", dragStart);
  taskBlock.addEventListener("dragend", dragEnd);

  toDoBlock.append(taskBlock);
});
