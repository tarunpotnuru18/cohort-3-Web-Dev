let todoMainInput = document.querySelector(".todo-input");
let todos = [];
async function logout() {
  document.querySelector(".Todo-container").innerHTML = "";
  let response = await axios.put(
    "http://localhost:3000/todos",
    {
      todos,
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  localStorage.removeItem("token");
  localStorage.removeItem("localtodos");
  window.location.href = "/signin.html";
}

async function start() {
  let response = await axios.get("http://localhost:3000/todos", {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  todos = response.data;
  localStorage.setItem("localtodo", todos);
  await render();
  await progress();
}
start();
/* 
{
  task:
  iscompleted:
  isediting:
  id: 
}
*/
window.onbeforeunload = async function () {
  await localtodoupdate();
};
//there is no need of it but we added as to know it exits this method run a function when something

async function localtodoupdate() {
  localStorage.setItem("localtodos", JSON.stringify(todos));
  await axios.put(
    "http://localhost:3000/todos",
    {
      todos: JSON.parse(localStorage.getItem("localtodos")),
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
}

async function add() {
  try {
    if (todoMainInput.value.trim() === "") {
      alert("write something master procastinator");
    } else {
      todos.push({
        task: todoMainInput.value,
        iscompleted: false,
        isediting: false,

        // a class where it gives current time which we can use it as unique id
      });
      localtodoupdate();
      todoMainInput.value = "";

      await render();
      await progress();
    }
  } catch (error) {
    console.log("error while adding a todo ", error);
  }
}

async function delTodo(id) {
  console.log("i am called" + id);
  let index = id;
  todos.splice(index, 1);
  await localtodoupdate();

  await render();
  await progress();
}
async function change(id, taskindex) {
  let index = id;
  if (document.querySelector(".task" + taskindex).value.trim() !== "") {
    // you may think why dont we directly write taskholder here but you know right there were manyy taskholders so that is the reason we given class id to each of them
    todos[index].task = document.querySelector(".task" + index).value;
  }
  await localtodoupdate();
  await render();
  await progress();
}
async function edit(id) {
  let index = id;
  todos[index].isediting = !todos[index].isediting;

  await localtodoupdate();
  await render();
  await progress();
}
async function markComplete(id) {
  let index = id;
  todos[index].iscompleted = !todos[index].iscompleted;
  await localtodoupdate();
  await render();
  await progress();
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
    markComplete(index);
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
  taskholder.onblur = function () {
    change(index, index); // we are adding this for change funtion
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
  /* editbutton.onclick = function () {
    edit(todo.id);
  }; */
  editbutton.setAttribute("onclick", `edit(${index})`);
  editbutton.classList.add("edit-style"); //for-css

  //delbutton
  delbutton.textContent = "delete";
  delbutton.setAttribute("onclick", `delTodo(${index})`);
  delbutton.classList.add("delete-style"); //for-css
  //appending all elements
  taskContainer.append(checkbox, taskholder, editbutton, delbutton);

  return taskContainer;
}

async function progress() {
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

async function render() {
  let todocontainer = document.querySelector(".Todo-container");
  todocontainer.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    let component = todoComponent(todos[i], i);
    todocontainer.append(component);
  }
}
