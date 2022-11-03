    const SETTING_TIME = 5;
    let words = [];
    let time;
    let isPlaying = false;
    let score = 0;

    const timeDisplay = document.querySelector('.time')
    const button = document.querySelector('.button')
    const wordDisplay = document.querySelector('.word-display')
    const wordInput = document.querySelector('.word-input')
    const scoreDisplay = document.querySelector('.score')


    //name-button
    const nameplay = document.querySelector('.name-button')
    const nameshow = document.querySelector('.name')

    nameplay.addEventListener('click',function(){
        nameshow.textContent = wordInput.value
        wordInput.value = ""
    })

    //first start method
    init();
    function init() {
        getWords();
        wordInput.addEventListener('keyup', checkMatch)
    }

    // get words
    function getWords() {
        fetch('https://random-word-api.herokuapp.com/all')
        .then((res) => res.json())
        .then(data => {
            data.forEach((word) => {
                if (word.length < 7) {
                    words.push(word);
                }
                btnTextChange('start', 'Easy Mode Start')
            })
        })
        .catch((err) => {
            console.log(err);
        })

    }
    function checkMatch() {
        if (!isPlaying) {
            runNotification('error')
            return
        }
        if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
            runNotification('success', wordInput.value);
            wordInput.value = "";
            scoreDisplay.innerText = ++score;
            time=SETTING_TIME;
<<<<<<< HEAD
            runNotification('success')
            const randomIndex = Math.floor(Math.random() * words.length)
=======
            const randomIndex = Math.floor(Math.random() * words.length);
>>>>>>> 159201abebc0d64d8b00d4e05008c61873badabb
            wordDisplay.innerText = words[randomIndex];
        }
    }

    function run() { 
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
        btnTextChange('loading', 'Playing..')
    }

    function countDown() {
        if (time <= 0) {
            isPlaying = false;
            clearInterval(timeInterval);
            btnTextChange('start', 'Done');
        } else {
            time--;
            timeDisplay.innerText = time;
        }
    }
    
    function btnTextChange(type, text) {
        button.innerText = text;
        type === 'loading' ? button.classList.add('loading') : button.classList.remove('loading')
    }


    function runNotification(type, text) {
        // toastify options
        const option = {
            text: `${text}!!`,
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