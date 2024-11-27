//https://petal-estimate-4e9.notion.site/DOM-Part-2-8f9a36ddde3e49bd8eea4c85db570fd8
// const inputElement = document.querySelector("input");
// let count = 1;

/* function addtodo() {
    if(inputElement.value==""){
        alert("please enter a todo to proceed!")
        return
    }
  counter = 0;
  const newTodo = document.createElement("div");
  newTodo.setAttribute("id", "todo" + counter);
  newTodo.innerHTML =
    inputElement.value +
    " <button onclick ='deletetodo(" +
    counter +
    ")'>delete</button>";
  document.querySelector(".todos").appendChild(newTodo);
  counter++;
  inputElement.value = "";

  const tododiv = document.createElement("div");
  tododiv.setAttribute("class", "todo" + count);
  const delbutton = document.createElement("button");
  delbutton.innerText = "Delete";
  delbutton.setAttribute("onclick", `deleteTodo(${count})`);
  const todotext = document.createElement("span");
  todotext.innerText = count + "." + inputElement.value;
  tododiv.append(todotext);
  tododiv.append(delbutton);
  document.querySelector(".todos").append(tododiv);
  count++, (inputElement.value = "");
}
function deleteTodo(id) {
  const del = document.querySelector("."+"todo" + id);
  del.parentNode.removeChild(del);
} */

// for practice we are creating our todo application from scratch

// making  our required  html elements storing in a variables
const box = document.querySelector(".todoinput");
const container = document.querySelector(".todo-container");
let count = 1;

//adding functionalities to the buttons
function addtodo() {
  const task = box.value;
  if (task.trim() == "") {
    alert("please enter a todo to proceed!");
    return;
  }
  const newdiv = document.createElement("div");
  const content = document.createElement("span");
  const del = document.createElement("button");
  del.textContent = "delete";
  del.setAttribute("onclick", `deltodo(${count})`);
  content.textContent = `${task}`;
  newdiv.setAttribute("class", `todo${count}`);
  newdiv.append(content);
  newdiv.append(del);
  container.append(newdiv);
  count++;
  box.value= "";
}
function deltodo(id) {
  const del = document.querySelector(`.todo${id}`);
  del.parentNode.removeChild(del);
}
