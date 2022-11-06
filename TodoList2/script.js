//default data
let todo = [{'date':'2022/11/01', tasks:[{ 'focus': true, 'task': '11111' },{ 'focus': false, 'task': '2222' }]}
,{'date':'2022/11/02', tasks:[{ 'focus': true, 'task': '11111' },{ 'focus': false, 'task': '2222' }]}];
let iconPlayBack = ['fa-play', 'fa-pause'];

// 1. Setting up the day
const getDay = () => {
    let year = new Date().getFullYear();
    let month = (new Date().getMonth()+1).toString().padStart(2,0);
    let day = new Date().getDay().toString().padStart(2,0);
    document.querySelector('.day').textContent = `${year}/${month}/${day}`;
}
getDay();

const getData = () => {
    window.localStorage.getData();
}
const initData = () => {
    todo.map((item, idx) => {
        console.log(item,idx);
    })
}
initData();
const createContextBox = (item, idx) => {
    let section = document.createElement('section');
    section.classList.add('content-box');
    section.setAttribute('id', `content-box-${idx}`);
    
    let daily = document.createElement('p');
    daily.classList.add('daily');
    daily.innerText = item.date;
    section.appendChild(daily);
}
const createTask = (item) => {
    let grids = ['grid-item1', 'grid-item2','grid-item3','grid-item4'];
    let ul = document.createElement('ul');
    let li = document.createElement('li');
    li.classList.add('grid-container');
    grids.map(item => {
        let  gridDiv = document.createElement('div');
        gridDiv.classList.add(item)
    })
}
const todoContent = () => {

}
const focusMode = () => {
    modifyGridTemplateArea();

    const focusArea = document.querySelector(".grid-item2");

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
const modifyGridTemplateArea = () => {
    let grid = document.querySelector('.grid-container');
    grid.style.gridTemplateAreas = "'grid-check-zone grid-time-zone grid-close-zone' 'grid-check-zone grid-content-zone grid-close-zone'"
}

//TodoList functions
const inputTask = document.querySelector('input[type="text"]');
const btnFocus = document.querySelector('#focus');
let focused = false;

inputTask.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        if (focused)
            focusMode();
        todo.tasks.push({'focus':focused, 'task':inputTask.textContent});
    }
});

btnFocus.addEventListener('click', (e) => {
   focused = e. target.checked;
   if(focused) 
    e. target.labels[0].classList.add('selected');
   else
    e. target.labels[0].classList.remove('selected');
})
