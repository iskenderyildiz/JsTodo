const form = document.querySelector("#formHandler")
const input = document.querySelector("#task")
const todo_container = document.querySelector(".todo_container")
let deleteBtns;
let checkboxes;
let editBtns;



const addHTML = (todo) => {


  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo")

  const todoLeft = document.createElement("div");
  todoLeft.classList.add("todo_left")

  const todoCb = document.createElement("input");
  todoCb.type = "checkbox";
  todoCb.checked = todo.isCompleted
  todoCb.classList.add("todo_cb")

  const todoText = document.createElement("span");
  todoText.classList.add("todo_text")
  todoText.textContent = todo.text

  todoLeft.appendChild(todoCb);
  todoLeft.appendChild(todoText)


  const todoRight = document.createElement("div");
  todoRight.classList.add("todo_right")

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "btn-danger", "todo_delete")
  deleteBtn.type = ("button")
  deleteBtn.textContent = "Sil"

  const editBtn = document.createElement("button");
  editBtn.classList.add("btn", "btn-warning", "todo_edit")
  editBtn.textContent = "Düzenle"

  todoRight.appendChild(deleteBtn);
  todoRight.appendChild(editBtn)


  todoDiv.appendChild(todoLeft)
  todoDiv.appendChild(todoRight)

  todo_container.appendChild(todoDiv)
}

const startConf = () => {
  //Başlangıç Ayarları

  const todos = JSON.parse(localStorage.getItem("todos"))
  if (!todos) {
    localStorage.setItem("todos", JSON.stringify([]))
  } else {
    todos.forEach(todo => {
      addHTML(todo)
    });
    deleteBtns = document.querySelectorAll(".todo_delete")
    checkboxes = document.querySelectorAll(".todo_cb")
    editBtns = document.querySelectorAll(".todo_edit")

  }
}

startConf();

const addTodo = (e) => {
  e.preventDefault();
  if(input.value===""){
    alert("Boş Bırakmayın ! ")

  } else{
    const inputVal = input.value
    const todo = {
      text : inputVal,
      isCompleted : false,
    }
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
  
    addHTML(todo)
  
    form.reset()
  }
}


const deleteTodo = (e) => {
  const todo = e.target.parentElement.parentElement;
  const text = todo.firstChild.children[1].textContent

  let todos = JSON.parse(localStorage.getItem("todos"));
   todos= todos.filter(td => td.text !=text);
   localStorage.setItem("todos", JSON.stringify(todos))

  todo.remove();

}


const completedTodo = (e) => {
  const todo = e.target.parentElement.parentElement;
  const text = todo.firstChild.children[1].textContent

  let todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach(td =>{
    if (td.text === text) td.isCompleted = !td.isCompleted
  })
   localStorage.setItem("todos", JSON.stringify(todos))

}


const editTodo = (e) => {
  const todo = e.target.parentElement.parentElement;
  const text = todo.firstChild.children[1].textContent

  let todos = JSON.parse(localStorage.getItem("todos"));
   todos= todos.filter(td => td.text !=text);
   localStorage.setItem("todos", JSON.stringify(todos))

  todo.remove();

  input.value= text;

}




form.addEventListener("submit", addTodo)

deleteBtns.forEach(btn => btn.addEventListener("click", deleteTodo))
checkboxes.forEach(btn => btn.addEventListener("click", completedTodo))
editBtns.forEach(btn => btn.addEventListener("click", editTodo))