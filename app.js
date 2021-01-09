//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event Listeners
todoButton.addEventListener("click", addTodo);

//Functions
function addTodo(event){
	//Prevent Form from submiting
	event.preventDefault();
	//Todo DIV
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	//Create LI
	const newTodo = document.createElement("li");
	newTodo.innerText = "hey";
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
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