const todoInput = document.querySelector(".todo-input");
const toDoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded",getTodos);
toDoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);



function addTodo(event){
  event.preventDefault(); //prevent from submiting

  //create div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create LI
  const newToDo = document.createElement("li");
  newToDo.innerText = todoInput.value;
  newToDo.classList.add("todo-item");
  todoDiv.appendChild(newToDo); // li do div
  //save
  saveLocalTodos(todoInput.value);
  //check mark button

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class ="fas fa-check"></li>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton); // butt do div

  //thrash button
  const thrashButton = document.createElement("button");
  thrashButton.innerHTML = '<i class ="fas fa-trash"></li>';
  thrashButton.classList.add("trash-btn");
  todoDiv.appendChild(thrashButton); // butt do div

  //apend to LIST
  todoList.appendChild(todoDiv);
  //clear todoInput
  todoInput.value = "";

}

function deleteCheck(e){
  const item = e.target;
  //delete todo
  if(item.classList[0] === "trash-btn"){
     const todo = item.parentElement;
     removeLocalTodos(todo);
     todo.remove();
  }
  //check mark
  if(item.classList[0] === "complete-btn"){
     const todo = item.parentElement;
     todo.classList.toggle("completed");
  }
}

function filterTodo(e){
   const todos =todoList.childNodes;
   console.log(todos);
   todos.forEach(function(todo){
     switch (e.target.value) {
    case "all":
          todo.style.display = "flex";
          break;
    case "completed":
      if (todo.classList.contains("completed")){
        todo.style.display = "flex";
      }
      else {
        todo.style.display="none";
      }
      break;
    case "uncompleted":
      if (!todo.classList.contains("completed")){
        todo.style.display = "flex";
      }
      else {
        todo.style.display="none";
      }
      break;
  }
});
}

function saveLocalTodos(todo){
  //check
  let todos;
  if(localStorage.getItem("todos") == null){
    todos=[];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos(){
  let todos
    if(localStorage.getItem("todos") == null){
      todos=[];
    }
    else{
      todos = JSON.parse(localStorage.getItem("todos"));
    }



  todos.forEach(function(todo){
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //create LI
      const newToDo = document.createElement("li");
      newToDo.innerText = todo;
      newToDo.classList.add("todo-item");
      todoDiv.appendChild(newToDo); // li do div
      //check mark button

      const completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class ="fas fa-check"></li>';
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton); // butt do div

      //thrash button
      const thrashButton = document.createElement("button");
      thrashButton.innerHTML = '<i class ="fas fa-trash"></li>';
      thrashButton.classList.add("trash-btn");
      todoDiv.appendChild(thrashButton); // butt do div

      //apend to LIST
      todoList.appendChild(todoDiv);
  });
}
function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem("todos") == null){
    todos=[];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));

}
