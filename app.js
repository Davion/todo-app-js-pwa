//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event){
	//Prevent Form from submiting
	event.preventDefault();
	//Prevent user from inserting empty todo
	if(todoInput.value === "") return;
	//Create Todo DIV
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	//Create LI
	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	//Add Todo to LocalStorage
	saveLocalTodos(todoInput.value);
	//
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	todoInput.value = "";
	//Check Mark BUTTON
	const completedButton = document.createElement("button");
	completedButton.innerHTML = "<i class='fas fa-check'></i>";
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);
	//Trash BUTTON
	const trashButton = document.createElement("button");
	trashButton.innerHTML = "<i class='fas fa-trash'></i>";
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);
	//Append To List
	todoList.appendChild(todoDiv);
}

function deleteCheck(event){
	const item = event.target;

	//DELETE TODO
	if(item.classList[0] === "trash-btn"){
		const todo = item.parentElement;
		//Animation
		todo.classList.add("fall");
		removeLocalTodos(todo);
		todo.addEventListener("transitionend", function(){
			todo.remove();
		});
	}

	//CHECK MARK
	if(item.classList[0] === "complete-btn"){
		const todo = item.parentElement;
		todo.classList.toggle("completed");
		console.log(todo.classList.contains("completed"));
		//saveCompletedClass(todo);
		if(todo.classList.contains("completed")){
			saveCompletedClass(todo);
		}else{
			removeCompletedClass(todo);
		}
	}	
}

function filterTodo(event){
	const todos = todoList.childNodes;
	todos.forEach(function(todo){
		switch(event.target.value){
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				if(todo.classList.contains("completed")){
					todo.style.display = "flex";
				}else{
					todo.style.display = "none";
				}
				break;
			case "uncompleted":
				if(!todo.classList.contains("completed")){
					todo.style.display = "flex";
				}else{
					todo.style.display = "none";
				}
				break;
		}
	});
}


//Local Storage
function saveLocalTodos(todo){
	let todos;
	if(localStorage.getItem("todos") === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

//-----------------------
function saveCompletedClass(todo){
	let completed;
	if(localStorage.getItem("todos") !== null){
		const todos = JSON.parse(localStorage.getItem("todos"));
		if(localStorage.getItem("completed") === null){
			completed = [];
		}else{
			completed = JSON.parse(localStorage.getItem("completed"));
		}

		const todoIndex = todos.indexOf(todo.children[0].innerText);
		completed[todoIndex] = true;
		localStorage.setItem("completed", JSON.stringify(completed));
	}

}

function removeCompletedClass(todo){
	let completed;
	if(localStorage.getItem("todos") !== null){
		const todos = JSON.parse(localStorage.getItem("todos"));
		if(localStorage.getItem("completed") === null){
			completed = [];
		}else{
			completed = JSON.parse(localStorage.getItem("completed"));
		}

		const todoIndex = todos.indexOf(todo.children[0].innerText);
		completed[todoIndex] = false;
		localStorage.setItem("completed", JSON.stringify(completed));
	}
}
//-----------------------

function getTodos(){
	let todos;
	if(localStorage.getItem("todos") === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	let completed;
	if(localStorage.getItem("completed") === null){
		completed = [];
	}else{
		completed = JSON.parse(localStorage.getItem("completed"));
	}

	todos.forEach(function(todo){
		//Create Todo DIV
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		let completedIndex = todos.indexOf(todo);
		if(completed[completedIndex]){
			todoDiv.classList.add("completed");
		}
		//Create LI
		const newTodo = document.createElement("li");
		newTodo.innerText = todo;
		newTodo.classList.add("todo-item");
		todoDiv.appendChild(newTodo);
		//todoInput.value = "";
		//Check Mark BUTTON
		const completedButton = document.createElement("button");
		completedButton.innerHTML = "<i class='fas fa-check'></i>";
		completedButton.classList.add("complete-btn");
		todoDiv.appendChild(completedButton);
		//Trash BUTTON
		const trashButton = document.createElement("button");
		trashButton.innerHTML = "<i class='fas fa-trash'></i>";
		trashButton.classList.add("trash-btn");
		todoDiv.appendChild(trashButton);
		//Append To List
		todoList.appendChild(todoDiv);
	})
}

function removeLocalTodos(todo){
	let todos;
	if(localStorage.getItem("todos") === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));

	if(localStorage.getItem("completed") !== null){
		const completed = JSON.parse(localStorage.getItem("completed"));
		completed.splice(todos.indexOf(todoIndex), 1);
		localStorage.setItem("completed", JSON.stringify(completed));
	}
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}