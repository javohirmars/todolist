
var inputForm = document.querySelector("#inputform");
var userInput = document.querySelector("#userinput");
var inputButton = document.querySelector("#btn");

var toDoList = [];


inputForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    toDoList.push(userInput.value);
})
