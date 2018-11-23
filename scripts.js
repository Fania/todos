const form = document.querySelector("form");
const list = document.querySelector("ul");
const tab = document.querySelector("tbody");

const whatInput = document.getElementById("addTodo");
const whenInput = document.getElementById("addDate");

const todos = {};
let counter = 0;

let today = new Date();
today = today.toDateString();


form.addEventListener("submit", saveTodo);
function saveTodo() {
  let id = `todo${counter}`;
  let dueDate = (new Date(whenInput.value)).toDateString();
  let date = whenInput.value ? dueDate : today;

  todos[id] = {
    what: whatInput.value,
    when: date,
    done: false
  };

  drawTable();
  counter++;
  // clear form
  whatInput.value = "";
  whenInput.value = "";
  event.preventDefault();
}


function drawTable() {
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
    // update checkbox status
    done.addEventListener("change", completeTodo);
    // delete todo
    del.addEventListener("click", deleteTodo);
  }
  // console.log("draw", todos);
  // event.preventDefault();
}


function completeTodo() {
  // checkbox > td > tr
  const parentRow = event.srcElement.parentElement.parentElement;
  const rowID = parentRow.firstChild.innerText;
  // update object and redraw table
  todos[rowID].done = !todos[rowID].done;
  drawTable();
}


function deleteTodo() {
  // button > td > tr
  const parentRow = event.srcElement.parentElement.parentElement;
  const rowID = parentRow.firstChild.innerText;
  // delete from object and redraw table
  delete todos[rowID];
  drawTable();
}

