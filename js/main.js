
let elTodoForm = document.querySelector("#input-form");
let elTodoInput = document.querySelector("#userinput");
let elToDoList = document.querySelector("#toDoList");
let elCleanBtn = document.querySelector("#btn-clean");


let elDeleteBtn = document.querySelector(".btn-del");
let elAllBtn = document.querySelector("#btn-all");
let elCompletedBtn = document.querySelector("#btn-completed");
let elUncompletedBtn = document.querySelector("#btn-uncompleted");
let elAllBtnCount = document.querySelector(".count-1");
let elCompletedBtnCount = document.querySelector(".count-2");
let elUncompletedBtnCount = document.querySelector(".count-3");
let elTodoSort = document.querySelector(".todo-sort");

let elTodoTemplate = document.querySelector("#todo-item-template").content;


let storage = window.localStorage
let localTodoArray = JSON.parse(storage.getItem("todoArray"))
let localCounter = JSON.parse(storage.getItem("counter"))

let toDosArray = localTodoArray || [];

let counter = localCounter || 1;


function updateArray() {
    storage.setItem("todoArray", JSON.stringify(toDosArray))
    renderTodos(toDosArray, elToDoList)
    calculateTodos(toDosArray)
}


elTodoForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    let input = elTodoInput.value.trim()

    if (input) {
        let oneTodo = {
            id: counter++,
            todo: input,
            isCompleated: false
        }
        storage.setItem("counter", JSON.stringify(counter))

        toDosArray.unshift(oneTodo);
        elTodoInput.value = null;
    }
    updateArray()
})

function renderTodos(array, wrapper) {
    wrapper.innerHTML = null

    let todoFragment = document.createDocumentFragment()

    array.forEach(item => {
        let todoTemplate = elTodoTemplate.cloneNode(true)

        todoTemplate.querySelector(".todo-text").textContent = item.todo
        todoTemplate.querySelector(".checkbox-todo").dataset.todoId = item.id
        todoTemplate.querySelector(".btn-del").dataset.todoId = item.id

        if (item.isCompleated === true) {
            todoTemplate.querySelector(".checkbox-todo").checked = true
        }
        todoFragment.appendChild(todoTemplate)
    });
    wrapper.appendChild(todoFragment)
}
renderTodos(toDosArray, elToDoList)


elToDoList.addEventListener('click', function (evt) {
    let check = evt.target.matches(".checkbox-todo")

    if (check) {
        let checkboxId = evt.target.dataset.todoId

        let foundTodo = toDosArray.find(item => item.id == checkboxId);
        let foundTodoIndex = toDosArray.findIndex(item => item.id == checkboxId)

        if (!foundTodo.isCompleated) {
            foundTodo.isCompleated = true
            toDosArray[foundTodoIndex].isCompleated = true
        } else {
            foundTodo.isCompleated = false
            toDosArray[foundTodoIndex].isCompleated = false
        }
        storage.setItem("todoArray", JSON.stringify(toDosArray))
        calculateTodos(toDosArray)
    }

    let checkForBtn = evt.target.matches(".btn-del")
    if (checkForBtn) {
        let checkboxId = evt.target.dataset.todoId

        let foundTodoIndex = toDosArray.findIndex(item => item.id == checkboxId)

        toDosArray.splice(foundTodoIndex, 1)
        updateArray()
    }
})


function calculateTodos(array) {
    let allTodos = array.length
    let completedTodos = array.filter(item => item.isCompleated == true)
    let notCompletedTodos = array.filter(item => item.isCompleated == false)

    elAllBtnCount.textContent = allTodos
    elCompletedBtnCount.textContent = allTodos - notCompletedTodos.length
    elUncompletedBtnCount.textContent = allTodos - completedTodos.length
}
calculateTodos(toDosArray)


elTodoSort.addEventListener("click", function (evt) {
    let elAllBtn = evt.target.matches("#btn-all")
    let elCompletedBtn = evt.target.matches("#btn-completed")
    let elUncompletedBtn = evt.target.matches("#btn-uncompleted")

    if (elAllBtn) {
        renderTodos(toDosArray, elToDoList)

    } else if(elCompletedBtn) {
        let completedTodos = toDosArray.filter(item => item.isCompleated == true)
        renderTodos(completedTodos, elToDoList)

    }else if (elUncompletedBtn) {
        let notCompletedTodos = toDosArray.filter(item => item.isCompleated == false)
        renderTodos(notCompletedTodos, elToDoList)

    }
})


elCleanBtn.addEventListener("click", function (evt) {
    toDosArray.splice(0, toDosArray.length)
    updateArray()
})