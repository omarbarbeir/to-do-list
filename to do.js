let input = document.querySelector('.input')
let submit = document.querySelector('.add')
let taskDiv = document.querySelector('.tasks')
let arrayOfTasks = []


if(localStorage.getItem('tasks')){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
    
}

getDataFromLocalstorage();

submit.onclick = function(){
    if (input.value !== '') {
        addTaskToArray(input.value);
        input.value = ''
    }
}


function addTaskToArray(taskText){
    let task ={
        id: Date.now(),
        title: taskText,
        completed : false
    }
    arrayOfTasks.push(task);
    addTasksToPageFrom(arrayOfTasks);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function addTasksToPageFrom(arrayOfTasks){
    taskDiv.innerHTML = '';
    arrayOfTasks.forEach((task)=>{
        let div = document.createElement('div');
        div.className = 'task';
        div.setAttribute('id',task.id);
        div.appendChild(document.createTextNode(task.title));
        
        let span = document.createElement('span');
        span.className = 'del';
        span.appendChild(document.createTextNode('Delete'));

        div.appendChild(span);

        taskDiv.appendChild(div);
        if(task.completed){
            div.className = 'task done'
        }
    })
}

function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks" , JSON.stringify(arrayOfTasks));
}


function getDataFromLocalstorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addTasksToPageFrom(tasks)   
    }
}

taskDiv.addEventListener('click',(e)=>{
    if(e.target.classList.contains('del')){
        e.target.parentElement.remove();
        deleteTask(e.target.parentElement.getAttribute('id'))
    }
    if(e.target.classList.contains('task')){
        e.target.classList.toggle('done');
        toggleStateTask(e.target.getAttribute('id'))
    }
})

function deleteTask(taskId){
    arrayOfTasks = arrayOfTasks.filter((task)=> task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks)
}

function toggleStateTask(taskId){
    for(let i = 0 ; i<arrayOfTasks.length ; i++){
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed ==false ? (arrayOfTasks[i].completed=true):(arrayOfTasks[i].completed = false)

        }
        addDataToLocalStorageFrom(arrayOfTasks)
    }
}


