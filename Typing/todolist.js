// 'use strict';
// const TIME = 7;
const SETTING_TIME = 15;
let words = [];
let time;
let isPlaying = false;
let score = 0;


const url = "https://random-word-api.herokuapp.com/all";
const timeDisplay = document.querySelector('.time')
const button = document.querySelector('.button')
const button2 = document.querySelector('.hard')
const wordDisplay = document.querySelector('.word-display')
const wordInput = document.querySelector('.word-input')
const scoreDisplay = document.querySelector('.score')


//name-button
const nameplay = document.querySelector('.name-button')
const nameshow = document.querySelector('.name')

nameplay.addEventListener('click', function(){
    nameshow.textContent = wordInput.value;
   });


//easy mode
init();
function init() {
    getWords();
    wordInput.addEventListener('keyup', checkMatch)
}


function checkStatus() {
    // console.log('checkstatus1')
    if (!isPlaying && time === 0) {
        isPlaying = false;
        buttonChange('start', 'Done');
        clearInterval(checkInterval)
    }
}
let diffcult = 'hard';
function checkMatch() {
    console.log('match1')
    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = "";
        if (!isPlaying) {
            runNotification('error')
            return
        }
        score++;
        scoreDisplay.innerText = score;
        if(diffcult == 'hard'){
        time = 7;} else{
            time=SETTING_TIME;
        }
        const randomIndex = Math.floor(Math.random() * words.length)
        wordDisplay.innerText = words[randomIndex];
        runNotification('success')
    }
}


function run() {
    diffcult = 'easy';
    if (words.length < 1) {
        return;
    }
    wordInput.value = "";
    wordInput.focus()
    score = 0;
    scoreDisplay.innerText = 0;
    time = SETTING_TIME;
    isPlaying = true;
    timeInterval = setInterval(countDown, 1000)
    checkInterval = setInterval(checkStatus, 50)
    buttonChange('loading', 'Playing..')
}

function countDown() {
    time > 0 ? time-- : isPlaying = false;
    timeDisplay.innerText = time;
    if (!isPlaying) {
        clearInterval(timeInterval)
    }
    // console.log('count')
}

// 단어 가져오기
function getWords() {
    axios.get(url).then((res) => {

        res.data.forEach((word) => {
            if (word.length < 7) {
                words.push(word);
            }
            buttonChange('start', 'Easy Mode Start')
        })
    }).catch((err) => {
        console.log(err);
    })
}

function buttonChange(type, text) {
    button.innerText = text;
    type === 'loading' ? button.classList.add('loading') : button.classList.remove('loading')
}

// hard mode


init2();
function init2() {
    getWords2();
    wordInput.addEventListener('keyup', checkMatch2)
}

function run2() {
    diffcult='hard';
    if (words.length < 1) {
        return;
    }
    wordInput.value = "";
    wordInput.focus()
    score = 0;
    
    scoreDisplay.innerText = 0;
    time = 7; 
    isPlaying = true;
    timeInterval2 = setInterval(countDown2, 1000)
    checkInterval2 = setInterval(checkStatus2, 50)
    buttonChange2('hard', 'Playing..')
}

function checkStatus2() {
 
    console.log('checkstatus2')
    if (!isPlaying && time === 0) {

        isPlaying = false;
        buttonChange2('start', 'Done');
        clearInterval(checkInterval2)
    }
}

function checkMatch2() {
    console.log('match2');
    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = "";
        if (!isPlaying) {
            runNotification1('error')
            return
        }
        time = 7; 
        timeDisplay.innerText = time;
        score ++;
        scoreDisplay.innerText = score;
        const randomIndex = Math.floor(Math.random() * words.length)
        wordDisplay.innerText = words[randomIndex];
        runNotification1('success')
        console.log('count')
    
}}



function countDown2() {
  
    time > 0 ? time-- : isPlaying = false;
    
    timeDisplay.innerText = time;    
    if (!isPlaying) {
        clearInterval(timeInterval2)
    }
    // console.log('count')
}


//getwords
function getWords2() {
    axios.get(url).then((res) => {

        res.data.forEach((word) => {
            if (word.length < 7) {
                words.push(word);
            }
            buttonChange2('start', 'Hard Mode Start')
        })
    }).catch((err) => {
        console.log(err);
    })
}

function buttonChange2(type, text) {
    button2.innerText = text;
    type === 'loading2' ? button2.classList.add('loading2') : button2.classList.remove('loading2')
}


function runNotification(type) {
    // toastify options
    const option = {
        text: `${wordDisplay.innerText}!!`,
        duration: 3000,
        newWindow: true,
        gravity: "top", // `top` or `bottom`
        position: 'left', // `left`, `center` or `right`
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
    }
    if (type === 'error') {
        option.text = 'Press start button!'
        option.position = 'right'
        option.backgroundColor = 'red'
    }

    Toastify(option).showToast();}
