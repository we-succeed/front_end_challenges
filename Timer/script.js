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
  var countdownBegin = 3600;
  let dateTimer = new Date(countdownBegin).getTime();
  console.log(dateTimer);
  var count = setInterval(function() {
    if (countdownBegin <= 0) {      
      timers.innerText='Done';
      clearCountdown(count);
    } else {
      --countdownBegin;
      timers.innerText=countdownBegin;  
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
// computed: {
//   time: function() {
//   return this.minutes + “ : “ + this.seconds;
//   },
//   hours: function() {
//   var milli = this.milliseconds;
//   // var hrs = new Date().getHours();
//   // Used getHours() since the below didn’t work for me
//   var hrs = Math.floor((milli / 3600000) % 24);
//   if (hrs >= 13) { hrs = hrs — 12 }
//   return hrs >= 10 ? hrs : ‘0’ + hrs;
//   },
//   minutes: function() {
//   var min = Math.floor(this.totalTime / 60);
//   return min >= 10 ? min : ‘0’ + min;
//   },
//   seconds: function() {
//   var sec = this.totalTime — (this.minutes * 60);
//   return sec >= 10 ? sec : ‘0’ + sec;
//   }
//   }