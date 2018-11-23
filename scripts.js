const form = document.querySelector("form");
const list = document.querySelector("ul");
const tab = document.querySelector("tbody");

let whatInput = document.getElementById("addTodo");
let whenInput = document.getElementById("addDate");

let todos = [];
let newtodos = {};

let counter = 0;

form.addEventListener("submit", saveTodo);
function saveTodo() {
  let id = `todo${counter}`;

  newtodos[id] = {
    what: whatInput.value,
    when: whenInput.value,
    done: false
  };

  console.log("new", newtodos);

  // drawTable();
  drawNewTable();
  counter++;

  // clear form
  // whatInput.value = "";
  event.preventDefault();
}





function drawNewTable() {
  // redraw from scratch
  tab.innerHTML = "";
  

  let len = Object.keys(newtodos).length;
  console.log(len);

  // go through all todos
  for(const t in newtodos) {
    
    // let todo = newtodos[i];
    console.log(t);
    console.log(newtodos[t]);

    let tr = document.createElement("tr");
    let what = document.createElement("td");
    let when = document.createElement("td");
    // let done = document.createElement("td");
    // let edit = document.createElement("td");
    // let del = document.createElement("td");
    let doneOrNot = newtodos[t].done ? "checked" : "";

    // set content of table row cells
    what.innerText = newtodos[t].what;
    when.innerText = newtodos[t].when;
    done.innerHTML = `<input type="checkbox" ${doneOrNot}>`;
    // edit.innerHTML = `<button class="${todo[0]}-edit">Edit</button>`;
    del.innerHTML = `<button class="${newtodos[t]}-del">Delete</button>`;

    tr.appendChild(what);
    tr.appendChild(when);
    // tr.appendChild(done);
    // tr.appendChild(edit);
    // tr.appendChild(del);
    tab.appendChild(tr);

    // update checkbox status
    // done.addEventListener("change", completeTodo);

    // delete todo
    // del.addEventListener("click", deleteTodo);

  }

  console.log("draw", newtodos);

  event.preventDefault();

}





function drawTable() {
  // redraw from scratch
  tab.innerHTML = "";

  // go through all todos
  for(let i=0; i < todos.length; i++) {
    
    let todo = todos[i];
    let tr = document.createElement("tr");
    let thid = document.createElement("td");
    let what = document.createElement("td");
    let when = document.createElement("td");
    let done = document.createElement("td");
    let edit = document.createElement("td");
    let del = document.createElement("td");
    let doneOrNot = todo[3] ? "checked" : "";

    // set content of table row cells
    thid.innerText = todo[0];
    what.innerText = todo[1];
    when.innerText = todo[2];
    done.innerHTML = `<input class="${todo[0]}-check" type="checkbox" ${doneOrNot}>`;
    edit.innerHTML = `<button class="${todo[0]}-edit">Edit</button>`;
    del.innerHTML = `<button class="${todo[0]}-del">Delete</button>`;

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
  let srcId = event.srcElement.className;
  console.log("srcId", srcId);
  let num = srcId.slice(4,5);
  console.log("num", num);
  console.log("`${todos[num][0]}-del`", `${todos[num][0]}-del`);
  // for(let i=0; i < todos.length; i++) {
  if(`${todos[num][0]}-del` == srcId) {
    todos.splice(num, 1);
    // button > td > tr
    const parentRow = event.srcElement.parentElement.parentElement;
    // button > td > tr > tbody
    const parentTBody = event.srcElement.parentElement.parentElement.parentElement;
    parentTBody.removeChild(parentRow);
  }
  // }
  drawTable();
  console.log("delete", todos);
}



