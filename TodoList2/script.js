//default data
let todos = [{'date':'2022/11/01', tasks:[{ 'focus': true, 'task': '11111', 'completed':true},{ 'focus': false, 'task': '2222', 'completed':true }]}
,{'date':'2022/11/02', tasks:[{ 'focus': true, 'task': '3333' , 'completed':false},{ 'focus': false, 'task': '4444', 'completed':false }]}];
let iconPlayBack = ['fa-play', 'fa-pause'];

// 1. Setting up the day
const getDay = () => {
    let year = new Date().getFullYear();
    let month = (new Date().getUTCMonth()+1).toString().padStart(2,0);
    let day = new Date().getUTCDate().toString().padStart(2,0);
    return `${year}/${month}/${day}`;

}
document.querySelector('.day').textContent = getDay();
const getData = () => {
    window.localStorage.getData();
}
//Section contextBox
let TodoSectionContextBox = (item, pid) => {
    let section = document.createElement('section');
    section.classList.add('content-box');
    section.setAttribute('id', `content-box-${pid}`);

    let daily = document.createElement('p');
    daily.classList.add('daily');
    daily.innerText = (item.date) ? item.date : getDay();
    section.appendChild(daily);

    let ul = document.createElement('ul');
    section.appendChild(ul);
    return section;
}
//task component
const TodoLi = (item, pid, idx) => {
    console.log(item);
    let li = document.createElement('li');
    li.classList.add('grid-container');
    li.setAttribute('id', `grid-container-${pid}-${idx}`);
    let grids = ['grid-item1', 'grid-item2','grid-item3','grid-item4'];
    grids.map(gridItem=> {
        let  gridDiv = document.createElement('div');
        gridDiv.classList.add(gridItem);
        if(gridItem === 'grid-item1') 
            gridDiv.appendChild(TodoInputCheckbox(pid,idx));
        else if(gridItem === 'grid-item2') {
            if(item.focus) {
                modifyGridTemplateArea(li);
                TodoFocusMode(gridDiv);
            }
        }
        else if(gridItem === 'grid-item3')
            gridDiv.innerText = item.task;
        else
            gridDiv.appendChild(DeleteButton(pid, idx));
        li.appendChild(gridDiv);
    });
    return li
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
//modified grid template area
const modifyGridTemplateArea = (el) => {
    let grid = el;
    grid.style.gridTemplateAreas = "'grid-check-zone grid-time-zone grid-close-zone' 'grid-check-zone grid-content-zone grid-close-zone'"
}

//TodoList functions
const inputTask = document.querySelector('input[type="text"]');
const btnFocus = document.querySelector('#focus');
let currentTodo = {'daily': getDay(), tasks:[]}
let focused = false;
let currentSection = TodoSectionContextBox(currentTodo, todos.length + 1);
document.body.appendChild(currentSection);

if (currentTodo.tasks.length === 0) {
    currentSection.style.display='none';
}
inputTask.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        currentSection.style.display='block';
        let obj = {
            'focus': focused,
            task: e.target.value
        }
        currentTodo.tasks.push(obj);
        let ul = document.querySelector(`#content-box-${todos.length + 1}`).querySelector('ul');
        ul.appendChild(TodoLi(obj,todos.length + 1, currentTodo.tasks.length));
    }
});
btnFocus.addEventListener('click', (e) => {
   focused = e. target.checked;
   if(focused) 
    e. target.labels[0].classList.add('selected');
   else
    e. target.labels[0].classList.remove('selected');
})

const initData = () => {
    //previous todoList UI from local storage data;
    todos.map((todo, pId) => {
        let section = TodoSectionContextBox(todo, pId);
        document.body.appendChild(section);
        let ul = document.querySelector(`#content-box-${pId}`).querySelector('ul');
        todo.tasks.map((task, idx) => {
            ul.appendChild(TodoLi(task,pId,idx));
        });
    });
    
}
initData();