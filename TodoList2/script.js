//default data
let todos = [];
// 1. Setting up the day
const getDate = () => {
    let year = new Date().getFullYear();
    let month = (new Date().getUTCMonth() + 1).toString().padStart(2, 0);
    let day = new Date().getUTCDate().toString().padStart(2, 0);
    return `${year}/${month}/${day}`;
}
const generateId = () => {
    return getDate().replaceAll('/', '');
}
/* UI component 
* 1. TodoSectionContextBox
* 2. TodoCheckBox
* 3. TodoFocusMode
* 4. TodoTask
* 5. TodoDelButton
* 6. TodoTaskComponent
* 7. TodoFocusMode
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

let TodoCheckBox = (item) => {
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `chk-${item.id}`);
    if (item.completed) {
        checkbox.setAttribute('checked', true);
    }
    //Check the currentTodo
    if (item.id.slice(0, 8) !== generateId())
        checkbox.setAttribute('disabled', true);

    //Checkbox EventListener     
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

    //Check the currentTodo
    if (item.id.slice(0, 8) === generateId()) {
        span.addEventListener('click', () => {
            let playIcon = document.querySelector(`#grid-container-${item.id} .play-group .fa-play`);
            let pauseIcon = document.querySelector(`#grid-container-${item.id} .play-group .fa-pause`);
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';

            item.completed = !(item.completed);
            todoCompleted(item);
            if (eval('count' + item.id))
                clearInterval(eval('count' + item.id));
        })
    }
    return span
}

//DelButton
const TodoDelButton = (item) => {
    let span = document.createElement('span');
    //Add event Listener
    if (item.id.slice(0, 8) === generateId()) {
        let i = document.createElement('i');
        i.classList.add('fa-solid', 'fa-xmark');
        i.setAttribute('id', `del-${item.id}`);
        span.style.cursor = 'pointer';
        span.addEventListener('click', () => {
            arrIdx = currentTodo.tasks.findIndex((x) => x.id === item.id);
            currentTodo.tasks.splice(arrIdx, 1);
            document.getElementById(`grid-container-${item.id}`).remove();
            if (currentTodo.tasks.length === 0)
                document.getElementById(`content-box-${item.id.slice(0, 8)}`).style.display = 'none';
        })
        span.appendChild(i);
    }
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
            gridDiv.appendChild(TodoCheckBox(item));
        } else if (gridItem === 'grid-item2') {
            if (item.focus) {
                modifyGridTemplateArea(div);
                TodoFocusMode(gridDiv, item);
            }
        } else if (gridItem === 'grid-item3') {
            gridDiv.appendChild(TodoTask(item));
        }
        else {
            gridDiv.appendChild(TodoDelButton(item));
        }
        div.appendChild(gridDiv);
    });
    return div
}
//FocusMode Component
const TodoFocusMode = (focusArea, item) => {
    var sec = 1500;
    //create an Icon element
    const timeIcon = document.createElement("i");
    timeIcon.classList.add('fa-solid', 'fa-clock');
    timeIcon.textContent = '25:00';

    //create an span element
    const timeSpan = document.createElement("span");
    timeSpan.appendChild(timeIcon);
    timeSpan.classList.add('time');

    //create an play icon
    const playSpan = document.createElement("span");
    playSpan.classList.add('play-group');

    let playIcon = document.createElement('i');
    playIcon.classList.add('fa-solid', 'fa-play');

    let pauseIcon = document.createElement('i');
    pauseIcon.classList.add('fa-solid', 'fa-pause');
    pauseIcon.style.display = 'none';

    playSpan.appendChild(playIcon);
    playSpan.appendChild(pauseIcon);

    playIcon.addEventListener('click', () => {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        window['count' + item.id] = setInterval(function () {
            //Change todo status to completed
            if (sec <= 0) {
                item.completed = true;
                clearInterval(eval('count' + item.id));
                timeCompleted(focusArea, playIcon, pauseIcon, timeIcon);
                todoCompleted(item.id);
            } else {
                --sec;
                let mins = Math.floor(sec / 60).toString().padStart(2, '0');
                let modSec = Math.floor(sec % 60).toString().padStart(2, '0');
                timeIcon.textContent = `${mins}:${modSec}`;
            }
        }, 1000);
    })
    pauseIcon.classList.add('fa-solid', 'fa-pause');
    pauseIcon.addEventListener('click', () => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        clearInterval(eval('count' + item.id));
    });

    if (item.id.slice(0, 8) !== generateId())
        timeCompleted(focusArea, playIcon, pauseIcon, timeIcon);
    //Added time-group and play-group
    focusArea.appendChild(timeSpan);
    focusArea.appendChild(playSpan);
    focusArea.style.display = 'inline-flex';

}
const todoCompleted = (item) => {
    if (item.completed) {
        document.querySelector(`#chk-${item.id}`).checked = true;
        document.querySelector(`#task-${item.id}`).classList.add('completed');
        document.querySelector(`#grid-container-${item.id} .grid-item2`).classList.add('time-completed');
    } else {
        document.querySelector(`#chk-${item.id}`).checked = false;
        document.querySelector(`#task-${item.id}`).classList.remove('completed');
        document.querySelector(`#grid-container-${item.id} .grid-item2`).classList.remove('time-completed');
    }
}
const timeCompleted = (focusArea, playIcon, pauseIcon, timeIcon) => {
    focusArea.classList.add('time-completed');
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'none';
    timeIcon.classList.add('without-after-element');
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
    let todos = JSON.parse(localStorage.getItem('todos'));
    //Set up the currentTodo  & currentSection
    if (todos !== null) {
        currentTodo = todos.filter(todo => todo.date === getDate())[0]
    }

    if (!currentTodo) {
        currentTodo = { 'id': generateId(), 'date': getDate(), tasks: [] }
        currentSection = TodoSectionContextBox(currentTodo);
        document.body.appendChild(currentSection);
    }
    if (currentTodo.tasks.length === 0) {
        currentSection.style.display = 'none';
    }
    //previous todoList UI from local storage data;
    todos && todos.map((todo) => {
        let section = TodoSectionContextBox(todo);
        todo.tasks.map((task) => {
            section.appendChild(TodoTaskComponent(task));
        });
        if (todo.date === getDate())
            currentSection = section;
        document.body.appendChild(section);
    });

    //Todo Task Main Features
    const inputTask = document.querySelector('input[type="text"]');
    const btnFocus = document.querySelector('#focus');
    const btnSave = document.querySelector('#save');

    inputTask.addEventListener('keyup', (e) => {
        if (e.target.value === '') return;
        if (e.keyCode === 13) {
            currentSection.style.display = 'block';
            let currentTask = {
                'id': generateId() + currentTodo.tasks.length.toString().padStart(2, '0'),
                'focus': focused,
                'task': e.target.value,
                'completed': false
            }
            currentTodo.tasks.unshift(currentTask);
            currentSection.appendChild(TodoTaskComponent(currentTask))
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
    btnFocus.addEventListener('keyup', () => {
        if (inputTask.value === '')
            inputTask.focus();
    })

    btnSave.addEventListener('click', () => {
        if (todos.filter((todo) => todo.id === currentTodo.id).length === 0) {
            todos.push(currentTodo);
        } else {
            if (todos.length > 6)
                todos.shift();
            todos.filter((todo) => todo.id === currentTodo.id)
                .map((t) => { t = currentTodo; })
        }
        if (localStorage.getItem('todos'))
            localStorage.remove('todos');
        localStorage.setItem('todos', JSON.stringify(todos));
    })
})();
