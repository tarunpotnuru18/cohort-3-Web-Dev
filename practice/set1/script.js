let count = 0;
// function add(){
//     let text = document.querySelector('.MainInputElement').value;

//     let newDiv = document.createElement("div");
//     newDiv.setAttribute("id","todo"+count);

//     let content = document.createElement("div")
//     content.textContent = text;

//     let del = document.createElement("button");
//     del.textContent = "delete";
//     del.setAttribute("onclick","del("+count+")")

//     newDiv.append(content)
//     newDiv.append(del)
//     document.querySelector(".todo-container").append(newDiv)
//     document.querySelector('.MainInputElement').value=''
//     count++;
// }
// function del(x){
//       document.querySelector("#todo"+x).remove()
// }
let todos = [];
function todocomponent(todo, index) {
  let task_container = document.createElement("div");
  task_container.classList.add(`task-container${index}`); //i am adding the task class because if i want to delte oi have to delete the entire container

  let checkbox = document.createElement("input");
  let task = document.createElement("input");
  let delbtn = document.createElement("button");
  let editbtn = document.createElement("button");

  // appending every button
  task_container.append(checkbox,task,delbtn,editbtn);

  //focus on checkbox here
  if (todo.iscompleted) {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }
   checkbox.type = "checkbox"
  checkbox.setAttribute("onclick", `markcomplete(${index})`);
  checkbox.classList.add(`check${index}`);

  // focus on task here
  task.value = todo.task; // remember in todo.task the task is the property of the object present in the todos array
  if (todo.isediting) {
    //  to make sure the task is clickable or not
    task.readOnly = false;
  } else {
    task.readOnly = true;
  }
  if (todo.iscompleted) {  // WE MAY THINK WHY WE HAD ADDED THIS AGAIN WHILE WE ADDE DTHIS IN MARKCOMPLETED FUNCTION MBUT REMEMBER THAT MARK COMPLETE FUNCTION IS CALLED ONLY CLICKED SO THE ELEMENTS HAVE TO BE RENDERD AS IT IS
    // to render them as elemnts with strike off
    task.classList.add("strike");
  }
  task.setAttribute("onchange",`change(${index})`)
 task.classList.add(`task${index}`)
task.classList.add(`inputstyle`)
  // focus on delbtn here

  delbtn.textContent = "delete";
  delbtn.setAttribute("onclick",`del(${index})`);
  delbtn.classList.add("delbtn");

  //focus on edit button here
  if (todo.isediting) {
    //to render this editbtn properly according to situation
    editbtn.textContent = "save";
  } else {
    editbtn.textContent = "edit";
  }
  editbtn.setAttribute("onclick",`edit(${index})`)
  return task_container;
}

function add() {
  if (document.querySelector(".todo-input").value.trim() == "") {
    alert("please enter some taks to proceed");
    return;
  }
  todos.push({
    task: document.querySelector(".todo-input").value,
    iscompleted: false,
    isediting: false,
  });
  document.querySelector(".todo-input").value = "";
  render()
}

// del function
function del(index){
   todos.splice(index,1);
   render();
}

//markcomplete function

function markcomplete(index){
    todos[index].iscompleted = !todos[index].iscompleted
        document.querySelector(`.task${index}`).classList.toggle("strike")
        
}

//change
function change(index){
    if(document.querySelector(`.task${index}`).value.trim()==''){
        document.querySelector(`.task${index}`).value = todos[index].task        
    }
    else{
        todos[index].task = document.querySelector(`.task${index}`).value;

    }
}

//edit
function edit(index){
    if(!todos[index].iscompleted){

        todos[index].isediting = !todos[index].isediting;
    }else{
        return
    }
    //  document.querySelector(`task${index}`).readOnly = !document.querySelector(`task${index}`).readOnly
     render();
}


// render function here

function render() {
    document.querySelector(".todo-container").innerHTML = "";
    for(let i = 0;i<todos.length;i++){
        document.querySelector(".todo-container").append(todocomponent(todos[i],i)) 
    }
}
