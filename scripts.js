const form = document.querySelector("form");
const list = document.querySelector("ul");
const tab = document.querySelector("tbody");

let whatInput = document.getElementById("addTodo");
let whenInput = document.getElementById("addDate");

const todos = [];
let counter = 0;

form.addEventListener("submit", saveTodo);
function saveTodo() {
  counter++;
  let id = `todo${counter}`;
  let tmp = [id, whatInput.value, whenInput.value, false]
  todos.push(tmp);
  
  drawTable();

  event.preventDefault();
}


function drawTable() {
  // console.log("drawing table");
  // redraw from scratch
  tab.innerHTML = "";

  // go through all todos
  for(let i=0; i < todos.length; i++) {
    
    let todo = todos[i];
    let tr = document.createElement("tr");
    let what = document.createElement("td");
    let when = document.createElement("td");
    let done = document.createElement("td");
    let edit = document.createElement("td");
    let del = document.createElement("td");
    let doneOrNot = todo[3] ? "checked" : "";

    // set content of table row cells
    what.innerText = todo[1];
    when.innerText = todo[2];
    done.innerHTML = `<input class="${todo[0]}-check" type="checkbox" ${doneOrNot}>`;
    edit.innerHTML = `<button class="${todo[0]}-edit">Edit</button>`;
    del.innerHTML = `<button class="${todo[0]}-del">Delete</button>`;

    tr.appendChild(what);
    tr.appendChild(when);
    tr.appendChild(done);
    tr.appendChild(edit);
    tr.appendChild(del);
    tab.appendChild(tr);

    // update checkbox status
    const checks = document.querySelectorAll("[type=checkbox]");
    for(let i=0; i < checks.length; i++) {
      checks[i].addEventListener("change", completeTodo);
    }

    // delete todos
    const delButtons = document.querySelectorAll("button[class^=todo]");
    for(let i=0; i < delButtons.length; i++) {
      delButtons[i].addEventListener("click", deleteTodo);
    }
  }

  console.log("draw", todos);

  // event.preventDefault();

}



function completeTodo() {
  for(let i=0; i < todos.length; i++) {
    if(`${todos[i][0]}-check` == event.srcElement.className) {
      todos[i][3] = event.srcElement.checked;
    }
  }
  drawTable();
  console.log("complete", todos);
}

function deleteTodo() {
  // console.log("num", num);
  for(let i=0; i < todos.length; i++) {
    if(`${todos[i][0]}-del` == event.srcElement.className) {
      todos.splice(i, 1);
      // button > td > tr
      const parentRow = event.srcElement.parentElement.parentElement;
      // button > td > tr > tbody
      const parentTBody = event.srcElement.parentElement.parentElement.parentElement;
      parentTBody.removeChild(parentRow);
    }
  }
  drawTable();
  console.log("delete", todos);
}



