let todos = [];

render();
progress();
let todoMainInput = document.querySelector(".todo-input");
/* 
{
  task:
  iscompleted:
  isediting:
  id: 
}
*/

function add() {
  if (todoMainInput.value.trim() === "") {
    alert("write something master procastinator");
  } else {
    todos.push({
      task: todoMainInput.value,
      iscompleted: false,
      isediting: false,
      id: Date.now(), // a class where it gives current time which we can use it as unique id
    });
    todoMainInput.value = "";

    render();
    progress();
  }
}
function delTodo(id) {
  console.log(id);
  let index = todos.findIndex((task) => {
    return task.id === id;
  });
  todos.splice(index, 1);
  render();
  progress();
}
function change(id, taskindex) {
  let index = todos.findIndex((task) => {
    return task.id === id;
  });
  if (document.querySelector(".task" + taskindex).value.trim() !== "") {
    // you may think why dont we directly write taskholder here but you know right there were manyy taskholders so that is the reason we given class id to each of them
    todos[index].task = document.querySelector(".task" + index).value;
  }
  render();
  progress();
}
function edit(id) {
  let index = todos.findIndex((task) => {
    return task.id === id;
  });
  todos[index].isediting = !todos[index].isediting;
  render();
  progress();
}
function markComplete(id) {
  let index = todos.findIndex((task) => {
    return task.id === id;
  });
  todos[index].iscompleted = !todos[index].iscompleted;
  render();
  progress();
}

function todoComponent(todo, index) {
  let taskContainer = document.createElement("div");
  let checkbox = document.createElement("input");
  let newSpan = document.createElement("span");
  let taskholder = document.createElement("input");
  let editbutton = document.createElement("button");
  let delbutton = document.createElement("button");

  //taskContainer
  taskContainer.classList.add("task-container");

  //checkbox
  checkbox.type = "checkbox";
  if (todo.iscompleted) {
    checkbox.checked = true;
  }
  checkbox.onclick = function () {
    markComplete(todo.id);
  };
  checkbox.classList.add("checkbox-style");

  //newspan
  newSpan.textContent = `${index + 1}.`;
  newSpan.classList.add("index"); //for-css

  //taskholder
  taskholder.type = "text";
  if (todo.isediting) {
    taskholder.readOnly = false;
  } else {
    taskholder.readOnly = true;
  }
  if (todo.iscompleted) {
    taskholder.classList.add("strike"); //for-css
  }
  taskholder.onchange = function () {
    change(todo.id, index); // we are adding this for change funtion
  };
  taskholder.value = todo.task;
  taskholder.classList.add("content-style"); //for-css
  taskholder.classList.add("task" + index); //we are adding this because the onchange change function will not work as expected without this as the function have to get the value of it
  //editbutton
  if (todo.isediting) {
    editbutton.textContent = "save";
  } else {
    editbutton.textContent = "edit";
  }
  editbutton.onclick = function () {
    edit(todo.id);
  };
  editbutton.classList.add("edit-style"); //for-css

  //delbutton
  delbutton.textContent = "delete";
  delbutton.setAttribute("onclick", `delTodo(${todo.id})`);
  delbutton.classList.add("delete-style"); //for-css
  //appending all elements
  taskContainer.append(checkbox, taskholder, editbutton, delbutton);

  return taskContainer;
}

function progress() {
  if (todos.length === 0) {
    document.querySelector(".bar").style.width = "0%";
    return;
  }
  let length = todos.length;
  let completed = todos.filter((todo) => {
    return todo.iscompleted === true;
  });

  document.querySelector(".bar").style.width = `${
    (completed.length / todos.length) * 100
  }%`;
}

function render() {
  let todocontainer = document.querySelector(".Todo-container");
  todocontainer.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    let component = todoComponent(todos[i],i);
    todocontainer.append(component);
  }
}
