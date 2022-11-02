const watch = document.querySelector('#watch');
let milliseconds = 0;
let timer;
document.addEventListener('click', (e) => {
  const el = e.target;
  if (el.id === 'start') startWatch();
  if (el.id === 'pause') pauseWatch();
  if (el.id === 'reset') resetWatch();
});

function startWatch() {
  watch.classList.remove('paused');
  clearInterval(timer);
  timer = setInterval(() => {
    milliseconds += 10;
    let dateTimer = new Date(milliseconds); //
    watch.innerHTML =
      ('0' + dateTimer.getUTCHours()).slice(-2) + ':' + 
      ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
      ('0' + dateTimer.getUTCSeconds()).slice(-2) + ':' +
      ('0' + dateTimer.getUTCMilliseconds()).slice(-3, -1);
  }, 10);
};

function pauseWatch() {
  watch.classList.add('paused');
  clearInterval(timer);
};

function resetWatch() {
  watch.classList.remove('paused');
  clearInterval(timer);
  milliseconds = 0;
  watch.innerHTML = '00:00:00:00';
};

// Pomodoro Timer
var timers = document.getElementById('timers');

function countdown() {
  let progress = document.querySelector('.progress');
  let secSession = document.querySelector('.sec');
  let strokeDashSec = 2 * Math.PI * 65;
  let strokeDashMin = 2 * Math.PI * 80;
  secSession.setAttribute('stroke-dasharray', strokeDashSec);
  progress.setAttribute('stroke-dasharray', strokeDashMin)
  var unit = 100
  var sec = 1500 * unit;
  var count = setInterval(function () {
    if (sec <= 0) {
      timers.innerText = 'Done';
      clearTimeout(count);
    } else {
      --sec;
      let mins = Math.floor(sec / 60 / unit).toString().padStart(2, '0');
      let modSec = Math.floor(sec % (60 * unit) / unit).toString().padStart(2, '0');
      timers.innerText = `${mins} : ${modSec}`
      secSession.setAttribute('stroke-dashoffset', strokeDashSec * (1 / (60*unit) * (sec % (60*unit))));
      progress.setAttribute('stroke-dashoffset', strokeDashMin * (1 / 25 * (sec / (60*unit))));
    }
  }, 10);
}

const openTabs = ((e, tab) => {
  Array.from(document.getElementsByClassName('container')).forEach(elem => {
    elem.style.display = "none";
  })
  document.getElementsByClassName(tab)[0].style.display = "block";
  Array.from(document.getElementsByClassName('tablinks')).forEach(btn => {
    btn.className = btn.className.replace(" selected", "");
  })
  e.currentTarget.className += " selected";
})

countdown();
