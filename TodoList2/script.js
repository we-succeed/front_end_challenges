//default data
let todos = [
    { 'date': '2022/11/02', 
        tasks: [
            { 'focus': true, 'task': '3333', 'completed': false }, 
            { 'focus': false, 'task': '4444', 'completed': false }]
    },
    {
        'date': '2022/11/01', 
        tasks: [
            { 'focus': true, 'task': '11111', 'completed': true },
            { 'focus': false, 'task': '2222', 'completed': true }]
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
//Section contextBox
let TodoSectionContextBox = (todo, pid) => {
    let section = document.createElement('section');
    section.classList.add('content-box');
    section.setAttribute('id', `content-box-${pid}`);

    let daily = document.createElement('p');
    daily.classList.add('daily');
    daily.innerText = (todo.date) ? todo.date : getDate();
    section.appendChild(daily);
    return section;
}
//Task component
const TodoTaskComponent = (item, pid, idx) => {
    let div = document.createElement('div');
    div.classList.add('grid-container');
    div.setAttribute('id', `grid-container-${pid}-${idx}`);
    let grids = ['grid-item1', 'grid-item2', 'grid-item3', 'grid-item4'];
    grids.map(gridItem => {
        let gridDiv = document.createElement('div');
        gridDiv.classList.add(gridItem);
        if (gridItem === 'grid-item1')
            gridDiv.appendChild(TodoInputCheckbox(pid, idx));
        else if (gridItem === 'grid-item2') {
            if (item.focus) {
                modifyGridTemplateArea(div);
                TodoFocusMode(gridDiv);
            }
        }
        else if (gridItem === 'grid-item3')
            gridDiv.innerText = item.task;
        else
            gridDiv.appendChild(DeleteButton(pid, idx));
        div.appendChild(gridDiv);
    });
    return div
}
const TodoInputCheckbox = (pid, id) => {
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `chk-${pid}-${id}`);
    return checkbox;
}
const DeleteButton = (pid, id) => {
    let span = document.createElement('span');
    let i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-xmark');
    i.setAttribute('id', `del-${pid}-${id}`);
    span.appendChild(i);
    return span;
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

//TodoList functions

(() => {
    let focused = false;
    let currentTodo
    let currentSection
    //Set up the currentTodo  & currentSection
    currentTodo = todos.filter(todo => todo.date === getDate())[0]
    if (!currentTodo) {
        currentTodo = { 'daily': getDate(), tasks: [] }
        currentSection = TodoSectionContextBox(currentTodo, todos.length);
        document.body.appendChild(currentSection);
    }
    if (currentTodo.tasks.length === 0) {
        currentSection.style.display = 'none';
    }
    //previous todoList UI from local storage data;
    todos.map((todo, pId) => {
        let section = TodoSectionContextBox(todo, pId);
        todo.tasks.map((task, idx) => {
            section.appendChild(TodoTaskComponent(task, pId, idx));
        });
        document.body.appendChild(section);
        if(todo.date === getDate())
            currentSection = section;
    });
    document.querySelector('.day').textContent = getDate();
    const inputTask = document.querySelector('input[type="text"]');
    const btnFocus = document.querySelector('#focus');
    inputTask.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            currentSection.style.display = 'block';
            let obj = {
                'focus': focused,
                task: e.target.value
            }
            currentTodo.tasks.push(obj);
            currentSection.appendChild(TodoTaskComponent(obj, todos.length, currentTodo.tasks.length))
            e.target.value = "";
        }
    });
    btnFocus.addEventListener('click', (e) => {
        focused = e.target.checked;
        if (focused)
            e.target.labels[0].classList.add('selected');
        else
            e.target.labels[0].classList.remove('selected');
    })
})();