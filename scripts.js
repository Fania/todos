"use strict";

const form = document.querySelector("form");
const list = document.querySelector("ul");
const tab = document.querySelector("tbody");
const whatInput = document.getElementById("addTodo");
const whenInput = document.getElementById("addDate");
const idInput = document.getElementById("todoID");

const todos = {};
let counter = 0;

// block out the past by setting a min date of today
let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let minDate = `${year}-${month}-${day}`;
whenInput.setAttribute("min", minDate);

const resetDate = () => {
  whenInput.value = today.toISOString().split('T')[0];
}
resetDate();

const saveTodo = () => {
  let id = `todo${counter}`;
  // set the date to today if user hasn't chosen one
  let dueDate = (new Date(whenInput.value)).toDateString();
  let date = whenInput.value ? dueDate : today.toDateString();
  // store todo in object
  todos[id] = {
    "what": whatInput.value,
    "when": date,
    "done": false
  };
  console.log("save", id);
  drawTable();
  // increase unique ID counter
  counter++;
  // clear form
  whatInput.value = "";
  resetDate();
  // don't reload page
  event.preventDefault();
}

const drawTable = () => {
  console.log("drawing");
  // redraw from scratch
  tab.innerHTML = "";
  // go through all todos
  for(const t in todos) {
    let tr = document.createElement("tr");
    let thid = document.createElement("td");
    let what = document.createElement("td");
    let when = document.createElement("td");
    let done = document.createElement("td");
    let edit = document.createElement("td");
    let del = document.createElement("td");
    let status = todos[t].done ? "checked" : "";
    // set content of table row cells
    thid.innerText = t;
    what.innerText = todos[t].what;
    when.innerText = todos[t].when;
    done.innerHTML = `<input type="checkbox" ${status}>`;
    edit.innerHTML = `<button>Edit</button>`;
    del.innerHTML = `<button>Delete</button>`;
    tr.appendChild(thid);
    tr.appendChild(what);
    tr.appendChild(when);
    tr.appendChild(done);
    tr.appendChild(edit);
    tr.appendChild(del);
    tab.appendChild(tr);
    // button functionality
    done.addEventListener("change", completeTodo);
    edit.addEventListener("click", editTodo);
    del.addEventListener("click", deleteTodo);
  }
}

const editTodo = () => {
  const parentRow = event.srcElement.parentElement.parentElement;
  const rowID = parentRow.firstChild.innerText;
  console.log("edit", rowID);
  // get the stored date from object and format
  let storedDate = new Date(todos[rowID].when);
  let storedDay = storedDate.getDate();
  let storedMonth = storedDate.getMonth() + 1;
  if (storedMonth < 10) storedMonth = `0${storedMonth}`;
  let storedYear = storedDate.getFullYear();
  // set what and when input boxes
  idInput.value = rowID;  // hidden
  whatInput.value = todos[rowID].what;
  whenInput.value = `${storedYear}-${storedMonth}-${storedDay}`;
  // show/hide the correct button
  submit.classList.toggle("hide");
  update.classList.toggle("hide");
  // update old todo rather than save a new todo
  update.addEventListener("click", updateTodo);
}

const updateTodo = () => {
  let rowID = idInput.value;
  console.log("update", rowID);
  let dueDate = (new Date(whenInput.value)).toDateString();
  let date = whenInput.value ? dueDate : today.toDateString();
  // update values of relevant todo
  todos[rowID] = {
    "what": whatInput.value,
    "when": date,
    "done": todos[rowID].done
  };
  drawTable();
  // clear/reset form
  whatInput.value = "";
  resetDate();
  submit.classList.toggle("hide");
  update.classList.toggle("hide");
  // prevent form submission (adds another new todo)
  event.preventDefault();
}

const completeTodo = () => {
  // checkbox > td > tr
  const parentRow = event.srcElement.parentElement.parentElement;
  const rowID = parentRow.firstChild.innerText;
  console.log("check", rowID);
  // update object and redraw table
  todos[rowID].done = !todos[rowID].done;
  drawTable();
}

const deleteTodo = () => {
  // button > td > tr
  const parentRow = event.srcElement.parentElement.parentElement;
  const rowID = parentRow.firstChild.innerText;
  console.log("delete", rowID);
  // delete from object and redraw table
  delete todos[rowID];
  drawTable();
}

form.addEventListener("submit", saveTodo);
