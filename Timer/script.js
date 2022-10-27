const watch = document.querySelector('#watch');
let milliseconds = 0;
let timer;

function startWatch() {
  watch.classList.remove('paused');
  clearInterval(timer);
  timer = setInterval(()=>{ 
    milliseconds += 10;
    let dateTimer = new Date(milliseconds);
    watch.innerHTML = 
      ('0'+dateTimer.getUTCHours()).slice(-2) + ':' +
      ('0'+dateTimer.getUTCMinutes()).slice(-2) + ':' +
      ('0'+dateTimer.getUTCSeconds()).slice(-2) + ':' +
      ('0'+dateTimer.getUTCMilliseconds()).slice(-3,-1);
  },10);
};

function pauseWatch() {
  watch.classList.add('paused');
  clearInterval(timer);
};

function resetWatch() {
  watch.classList.remove('paused');
  clearInterval(timer);
  milliseconds = 0;
  watch.innerHTML= '00:00:00:00';
};

document.addEventListener('click', (e) =>{
  const el = e.target;
  if (el.id === 'start') startWatch();
  if (el.id === 'pause') pauseWatch();
  if (el.id === 'reset') resetWatch();
});
var timers = document.getElementById('timers');

function clearCountdown(interval) {
  clearTimeout(interval);
}

function countdown() {
  let progress = document.querySelector('.progress');
  let secSession = document.querySelector('.sec');
  let strokeDash = 2 * Math.PI * 65 ;
  secSession.setAttribute('stroke-dasharray', strokeDash)
  var sec = 1500;
  var count = setInterval(function() {
    if (sec <= 0) {      
      timers.innerText='Done';
      clearCountdown(count);
    } else {
      --sec;
      let mins = ('0' + Math.floor(sec / 60).toString()).slice(-2);
      let modSec = ('0' + (sec%60).toString()).slice(-2);
      timers.innerText=`${mins} : ${modSec}`;  
      secSession.setAttribute('stroke-dashoffset', strokeDash* (1/60 * (sec%60)));
    }    
  }, 1000);
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