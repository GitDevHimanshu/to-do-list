let localTask;
document.addEventListener("DOMContentLoaded", loadTaskFromLocalStorage());

function loadTaskFromLocalStorage() {
    var taskDiv = document.getElementById("tasks");
    taskDiv.innerHTML = '';

     localTask = localStorage.getItem('tasks');
    if (localTask) {
        localTask = JSON.parse(localTask);
    } else {
        localTask = [];
    }

    localTask.forEach(function (valueObj) {
        createTask(valueObj);
    });
}

function saveToLocalStorage(taskArr) {
    localStorage.setItem("tasks", JSON.stringify(taskArr));
}

// function to create a task

function createTask(ElementObj) {
    

    var taskDiv = document.getElementById("tasks");

    const task = document.createElement("div");
    task.id = ElementObj.id;
    task.style.display = "flex";
    task.style.borderBottom = "1px solid grey";

    const taskText = document.createElement("h4");
    taskText.innerHTML = ElementObj.name;
    taskText.style.width = "90%";
    taskText.style.textAlign = "left";
    taskText.style.marginLeft = "10px";
    
    task.appendChild(taskText);

    const taskCheck = document.createElement("input");
    taskCheck.type = "checkbox";
    taskCheck.checked = ElementObj.check;
    if(ElementObj.check){
        taskText.style.textDecoration="line-through";
    }
    taskCheck.style.margin = "3px";
    taskCheck.style.width = "20px";
    
    // eventlistner for check uncheck button

    taskCheck.addEventListener("click", function(){
        if(taskCheck.checked){
            ElementObj.check=true;
            taskText.style.textDecoration = "line-through";
        }
        else{
            ElementObj.check=false;
            taskText.style.textDecoration = "";
        }
        
        // saving changes into the local storage after check or uncheck

        // const localTask = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log(localTask)
        localTask.forEach( function(value){
        if(value.id == ElementObj.id){
           value.check = ElementObj.check;
        }    
        })
        saveToLocalStorage(localTask);
    })

    task.appendChild(taskCheck);

    const deleteTask = document.createElement("input");
    deleteTask.type = "button";
    deleteTask.setAttribute("value", "X");
    deleteTask.style.height = "40%";
    deleteTask.style.alignSelf = "center"
    deleteTask.style.margin = "4px";

    // eventlistener for delete button

    deleteTask.addEventListener("click", function(){
        task.remove();

        //saving changes to local storage after deleting any task

        localTask.forEach( function(value, index){
            if(value.id == ElementObj.id){
                localTask.splice(index,1);
            }    
        })
        saveToLocalStorage(localTask);
    })
    task.appendChild(deleteTask); 

    const editTast = document.createElement('input');
    editTast.type="button";
    editTast.setAttribute("value","Edit")
    editTast.style.height ="50%"
    editTast.style.alignSelf = "center"
    editTast.addEventListener("click",function(){
        let newName = prompt("Enter a new name for this task!");
        if (newName != null) {
            ElementObj.name = newName;  
            taskText.innerHTML = newName;
           
            // saving changes to local storage after changing the name of task
           
            localTask.forEach( function(value){
                if(value.id == ElementObj.id){
                    value.name = newName;
                    }
            })
            saveToLocalStorage(localTask);
            }
        });
    task.appendChild(editTast);
    taskDiv.appendChild(task);
}

var textArea = document.getElementById("task_ip");

// eventlisner for enter into the text area

textArea.addEventListener("keyup", function (event) {
    var textValue = textArea.value.trim();
    if (event.key === "Enter" && textValue !== "") {
        newTask();
    }
    else if ( event.key === "Enter" && textValue === ""){
        alert("task is empty!");
    }
});

// creating object of new task 

function newTask() {
    const textArea = document.getElementById("task_ip");
    const taskName = textArea.value;

    let localTask = localStorage.getItem("tasks");
    if (localTask) {
        localTask = JSON.parse(localTask);
    } else {
        localTask = [];
    }

    const newTask = {
        name: taskName,
        id: Date.now(),
        check: false
    }

    localTask.push(newTask);
    saveToLocalStorage(localTask);
    createTask(newTask);
    textArea.value = "";
}










































