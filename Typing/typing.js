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
        // axios.get('https://random-word-api.herokuapp.com/all')
        // .then((res) => {
        //     res.data.forEach((word) => {
        //         if (word.length < 7) {
        //             words.push(word);
        //         }
        //         buttonChange('start', 'Easy Mode Start')
        //     })
        // }).catch((err) => {
        //     console.log(err);
        // })

        fetch('https://random-word-api.herokuapp.com/all')
        .then((res) => res.json())
        .then(data => {
            data.forEach((word) => {
                if (word.length < 7) {
                    words.push(word);
                }
                buttonChange('start', 'Easy Mode Start')
            })
        })
        .catch((err) => {
            console.log(err);
        })

    }

    // check match
    function checkStatus() {
        if (!isPlaying && time === 0) {
            isPlaying = false;
            buttonChange('start', 'Done');
            clearInterval(checkInterval)
        }
    }

    let diffcult = 'hard';

    function checkMatch() {
        if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
            wordInput.value = "";
            if (!isPlaying) {
                runNotification('error')
                return
            }
            score++;
            scoreDisplay.innerText = score;
            time=SETTING_TIME;
            const randomIndex = Math.floor(Math.random() * words.length)
            wordDisplay.innerText = words[randomIndex];
            runNotification('success')
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
        checkInterval = setInterval(checkStatus, 50)
        buttonChange('loading', 'Playing..')
    }

    function countDown() {
        time > 0 ? time-- : isPlaying = false;
        timeDisplay.innerText = time;
        if (!isPlaying) {
            clearInterval(timeInterval)
        }

    }
    
    function buttonChange(type, text) {
        button.innerText = text;
        type === 'loading' ? button.classList.add('loading') : button.classList.remove('loading')
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



