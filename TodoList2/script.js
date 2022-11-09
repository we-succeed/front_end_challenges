//default data
let todos = [
    { id:'20221102', 'date': '2022/11/02', 
        tasks: [
            { id:'2022110200', 'focus': true, 'task': '3333', 'completed': false }, 
            { id:'2022110201','focus': false, 'task': '4444', 'completed': false }]
    },
    {  id:'20221101',
        'date': '2022/11/01', 
        tasks: [
            {id:'2022110100', 'focus': true, 'task': '11111', 'completed': true },
            {id:'2022110101', 'focus': false, 'task': '2222', 'completed': true }]
    }
];
let iconPlayBack = ['fa-play', 'fa-pause'];

// 1. Setting up the day
const getDate = () => {
    let year = new Date().getFullYear();
    let month = (new Date().getUTCMonth() + 1).toString().padStart(2, 0);
    let day = new Date().getUTCDate().toString().padStart(2, 0);
    return `${year}/${month}/${day}`;
}
const generateId = () => {
    return getDate().replaceAll('/','');
}
/* UI component 
* 1. TodoSectionContextBox
* 2. TodoTaskComponent
* 3. TodoFocusMode
*/ 
let TodoSectionContextBox = (todo) => {
    let section = document.createElement('section');
    section.classList.add('content-box');
    section.setAttribute('id', `content-box-${todo.id}`);

    let daily = document.createElement('p');
    daily.classList.add('daily');
    daily.innerText = (todo.date) ? todo.date : getDate();
    section.appendChild(daily);
    return section;
}

let TodoCheckbox = (item) => {
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `chk-${item.id}`);
    if (item.completed) {
        checkbox.setAttribute('checked', true);
    } 
    if (item.id.slice(0,8) !== generateId()) {
        checkbox.setAttribute('disabled', true);
    }
    checkbox.addEventListener('click', (e) => {
        let task = document.querySelector(`#task-${item.id}`);
        if (e.target.checked) {
            task.classList.add('completed');
        } else {
            task.classList.remove('completed');
        }
    })
    return checkbox
}
let TodoTask = (item) => {
    let span = document.createElement('span');
    span.setAttribute('id', `task-${item.id}`);
    span.style.cursor = 'pointer';
    span.innerText = item.task;
    if (item.completed) 
        span.classList.add('completed');
    else
        span.classList.remove('completed');
    
    //Add event Listener
    if (item.id.slice(0,8) === generateId()) {
        span.addEventListener('click', () => {
            let taskchk = document.querySelector(`#chk-${item.id}`);
            item.completed = !(item.completed);
            if (item.completed) {
                taskchk.checked = true;
                span.classList.add('completed');
            } else {
                taskchk.checked = false;
                span.classList.remove('completed');
            }
        })
    } 
    return span
}
//DelButton
const TodoDelButton = (item) => {
    let span = document.createElement('span');
    let i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-xmark');
    i.setAttribute('id', `del-${item.id}`);
    span.style.cursor = 'pointer';
    //Add event Listener
    if (item.id.slice(0,8) === generateId()) {
        span.addEventListener('click', () => {
            arrIdx = currentTodo.tasks.findIndex((x) => x.id === item.id);
            currentTodo.tasks.splice(arrIdx, 1);
            document.getElementById(`grid-container-${item.id}`).remove();
        })
    }
    span.appendChild(i);
    return span
}
//Task component
const TodoTaskComponent = (item) => {
    let div = document.createElement('div');
    div.classList.add('grid-container');
    div.setAttribute('id', `grid-container-${item.id}`);
    let grids = ['grid-item1', 'grid-item2', 'grid-item3', 'grid-item4'];
    grids.map(gridItem => {
        let gridDiv = document.createElement('div');
        gridDiv.classList.add(gridItem);
        if (gridItem === 'grid-item1') {
            gridDiv.appendChild(TodoCheckbox(item));
        }
        else if (gridItem === 'grid-item2') {
            if (item.focus) {
                modifyGridTemplateArea(div);
                TodoFocusMode(gridDiv);
            }
        }
        else if (gridItem === 'grid-item3') {
            gridDiv.appendChild(TodoTask(item));
        }
        else{
            gridDiv.appendChild(TodoDelButton(item));
        }
        div.appendChild(gridDiv);
    });
    return div
}
const TodoFocusMode = (focusArea) => {
    //create an Icon element
    const timeIcon = document.createElement("i");
    timeIcon.classList.add('fa-solid', 'fa-clock');
    timeIcon.textContent = "25:00";

    //create an span element
    const timeSpan = document.createElement("span");
    timeSpan.appendChild(timeIcon);
    timeSpan.classList.add('time');

    //create an play-group span element
    const playSpan = document.createElement("span");
    playSpan.classList.add('play-group');

    //and give it icon
    iconPlayBack.map((ico) => {
        let playIcon = document.createElement('i');
        playIcon.classList.add('fa-solid', ico);
        playSpan.appendChild(playIcon);
    });

    //Added time-group and play-group
    focusArea.appendChild(timeSpan);
    focusArea.appendChild(playSpan);
    focusArea.style.display = 'inline-flex';
}
//Modify grid template area
const modifyGridTemplateArea = (el) => {
    let grid = el;
    grid.style.gridTemplateAreas = "'grid-check-zone grid-time-zone grid-close-zone' 'grid-check-zone grid-content-zone grid-close-zone'"
}
var currentTodo
(() => {
    document.querySelector('.day').textContent = getDate();
    let focused = false;
    let currentSection
    // let todos = JSON.parse(localStorage.getItem('todos'));
    //Set up the currentTodo  & currentSection
    currentTodo = todos.filter(todo => todo.date === getDate())[0]
    if (!currentTodo) {
        currentTodo = {'id':generateId(), 'date': getDate(), tasks: [] }
        currentSection = TodoSectionContextBox(currentTodo);
        document.body.appendChild(currentSection);
    }
    if (currentTodo.tasks.length === 0) {
        currentSection.style.display = 'none';
    }
    //previous todoList UI from local storage data;
    todos.map((todo) => {
        let section = TodoSectionContextBox(todo);
        todo.tasks.map((task) => {
            section.appendChild(TodoTaskComponent(task));
        });
        if(todo.date === getDate())
            currentSection = section;
        document.body.appendChild(section);
    });

    const inputTask = document.querySelector('input[type="text"]');
    const btnFocus = document.querySelector('#focus');
    const btnSave = document.querySelector('#save');

    inputTask.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            currentSection.style.display = 'block';
            let currentTask = {
                'id': generateId() + currentTodo.tasks.length.toString().padStart(2,'0'),
                'focus': focused,
                task: e.target.value
            }
            currentTodo.tasks.push(currentTask);
            const task = TodoTaskComponent(currentTask);
            currentSection.appendChild(task)
            e.target.value = "";
        }
    });

    btnFocus.addEventListener('click', (e) => {
        focused = e.target.checked;
        if (focused)
            e.target.labels[0].classList.add('selected');
        else
            e.target.labels[0].classList.remove('selected');
    });

    btnSave.addEventListener('click', () => {
        todos.push(currentTodo);
        localStorage.setItem('todos',  JSON.stringify(todos));
    })
})();

