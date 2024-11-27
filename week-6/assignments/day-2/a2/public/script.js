
let todoMainInput = document.querySelector(".todo-input");
let todos = [];
function logout(){
  localStorage.removeItem("token")
  document.querySelector(".Todo-container").innerHTML = ""
  window.location.href = "/signin.html"
}

async function start() {
  let response = await axios.get("http://localhost:3000/todos", {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  todos = response.data;
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
async function updateTodos() {
  try {
    let response = await axios.get("http://localhost:3000/todos", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    todos = response.data;
  } catch (error) {
    console.log("error occured while updatetodos");
  }
}

async function add() {
  try {
    if (todoMainInput.value.trim() === "") {
      alert("write something master procastinator");
    } else {
      let response = await axios.post(
        "http://localhost:3000/todos",
        {
          task: todoMainInput.value,
          iscompleted: false,
          isediting: false,
          todoid: Date.now(),
          // a class where it gives current time which we can use it as unique id
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      todoMainInput.value = "";

      await updateTodos();
      await render();
      await progress();
    }
  } catch (error) {
    console.log("error while adding a todo ", error);
  }
}

async function delTodo(id) {
  console.log("i am called" +id )

  const response = await axios.delete(`http://localhost:3000/todos/${id}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
   
  });

  await updateTodos();
  await render();
  await progress();
}
async function change(id, taskindex) {
  let index = todos.findIndex((task) => {
    return task.todoid === id;
  });
  if (document.querySelector(".task" + taskindex).value.trim() !== "") {
    // you may think why dont we directly write taskholder here but you know right there were manyy taskholders so that is the reason we given class id to each of them
    todos[index].task = document.querySelector(".task" + index).value;
  }
  await axios.put(
    "http://localhost:3000/todos",
    {
      task: todos[index].task,
      iscompleted: todos[index].iscompleted,
      todoid: todos[index].todoid,
      isediting: todos[index].isediting,
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  await updateTodos();
  await render();
  await progress();
}
async function edit(id) {
  let index = todos.findIndex((task) => {
    return task.todoid === id;
  });
  todos[index].isediting = !todos[index].isediting;
  await axios.put(
    "http://localhost:3000/todos",
    {
      task: todos[index].task,
      iscompleted: todos[index].iscompleted,
      todoid: todos[index].todoid,
      isediting: todos[index].isediting,
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  await updateTodos();
  await render();
  await progress();
}
async function markComplete(id) {
  let index = todos.findIndex((task) => {
    return task.todoid === id;
  });

  todos[index].iscompleted = !todos[index].iscompleted;
  await axios.put(
    "http://localhost:3000/todos",
    {
      task: todos[index].task,
      iscompleted: todos[index].iscompleted,
      todoid: todos[index].todoid,
      isediting: todos[index].isediting,
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
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
    markComplete(todo.todoid);
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
    change(todo.todoid, index); // we are adding this for change funtion
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
  editbutton.setAttribute("onclick", `edit(${todo.todoid})`);
  editbutton.classList.add("edit-style"); //for-css

  //delbutton
  delbutton.textContent = "delete";
  delbutton.setAttribute("onclick", `delTodo(${todo.todoid})`);
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
