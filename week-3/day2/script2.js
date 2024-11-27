// //https://petal-estimate-4e9.notion.site/DOM-Part-2-8f9a36ddde3e49bd8eea4c85db570fd8
// const inputElement = document.querySelector("input");
// let count = 1;

// function addtodo() {
//     if(inputElement.value==""){
//         alert("please enter a todo to proceed!")
//         return
//     }
//   /* counter = 0;
//   const newTodo = document.createElement("div");
//   newTodo.setAttribute("id", "todo" + counter);
//   newTodo.innerHTML =
//     inputElement.value +
//     " <button onclick ='deletetodo(" +
//     counter +
//     ")'>delete</button>";
//   document.querySelector(".todos").appendChild(newTodo);
//   counter++;
//   inputElement.value = ""; */

//   const tododiv = document.createElement("div");
//   tododiv.setAttribute("class", "todo" + count);
//   const delbutton = document.createElement("button");
//   delbutton.innerText = "Delete";
//   delbutton.setAttribute("onclick", `deleteTodo(${count})`);
//   const todotext = document.createElement("span");
//   todotext.innerText = count + "." + inputElement.value;
//   tododiv.append(todotext);
//   tododiv.append(delbutton);
//   document.querySelector(".todos").append(tododiv);
//   count++, (inputElement.value = "");
// }
// function deleteTodo(id) {
//   const del = document.querySelector("."+"todo" + id);
//   del.parentNode.removeChild(del);
// }

//using state and components
const todoinput = document.querySelector(".todo-input");
let count = 0;
let todo = [];

function add() {
  if (todoinput.value.trim() == "") {
    alert("please enter a task to do proceed");
    return;
  }
  todo.push({ content: todoinput.value });
  count++;
  render();
}
function deleteTask(val) {
  todo.splice(val, 1);
  render();
}
function component(todo, index) {
  const newDiv = document.createElement("div");
  const newSpan = document.createElement("span");
  const del = document.createElement("button");
 
  newDiv.append(newSpan);
  newDiv.append(del);
  newSpan.textContent = `${index + 1}.${todo.content}`;
  del.setAttribute("onclick", `deleteTask(${index})`);
  del.textContent = "Delete";
  todoinput.value = "";
  return newDiv;
}

function render() {
  document.querySelector(".Todo-container").innerHTML = "";
  for (let i = 0; i < todo.length; i++) {
    const task = component(todo[i], i);
    document.querySelector(".Todo-container").append(task);
  }
}
