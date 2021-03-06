const domMin = document.getElementById('minutes');
const domSec = document.getElementById('seconds');

const start = document.getElementById('start');
const pause = document.getElementById('pause');
const reset = document.getElementById('reset');

const defaultFirst = document.getElementById('default-first');
const defaultSecond = document.getElementById('default-second');
const timerCustom = document.getElementById('timer-custom');

let originalMinutes = 30;
let originalSeconds = 0;
let firstMinutes = 25;
let secondMinutes = 5;
let minutes;
let seconds;

defaultFirst.textContent = `${twoNumbers(firstMinutes)}:00`;
defaultSecond.textContent = `${twoNumbers(secondMinutes)}:00`;
timerCustom.value = `${twoNumbers(originalMinutes)}:${twoNumbers(originalSeconds)}`;

originalValues();

function startTimer(min, sec) {
  start.textContent = 'Continue';
  let interval = setInterval(() => {
    if (sec === 0) {
      if (min === 0) {
        clearInterval(interval);
        originalValues();
        start.textContent = 'Start';
        return;
      }
      min--;
      sec = 60;
    }
    sec--;
    domMin.textContent = twoNumbers(min);
    domSec.textContent = twoNumbers(sec);
    document.title = `${twoNumbers(min)}:${twoNumbers(sec)}`;

    pause.addEventListener('click', () => {
      start.disabled = false;
      pause.disabled = true;
      reset.disabled = false;
      clearInterval(interval);
      minutes = min;
      seconds = sec;
    });

    reset.addEventListener('click', () => {
      clearInterval(interval);
      originalValues();
      start.textContent = 'Start';
      document.title = `${twoNumbers(originalMinutes)}:${twoNumbers(originalSeconds)}`;
    });
  }, 1000);
}

function twoNumbers(num) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

function originalValues() {
  start.disabled = false;
  pause.disabled = true;
  reset.disabled = true;
  minutes = originalMinutes;
  seconds = originalSeconds;

  domMin.textContent = twoNumbers(originalMinutes);
  domSec.textContent = twoNumbers(originalSeconds);

  defaultFirst.disabled = false;
  defaultSecond.disabled = false;
  timerCustom.disabled = false;
}

start.addEventListener('click', () => {
  start.disabled = true;
  pause.disabled = false;
  reset.disabled = false;

  defaultFirst.disabled = true;
  defaultSecond.disabled = true;
  timerCustom.disabled = true;

  minutes = parseInt(minutes);
  seconds = parseInt(seconds);
  
  startTimer(minutes, seconds);
});

defaultFirst.addEventListener('click', () => {
  originalMinutes = firstMinutes;
  document.title = `${twoNumbers(originalMinutes)}:${twoNumbers(originalSeconds)}`;
  originalValues();
});

defaultSecond.addEventListener('click', () => {
  originalMinutes = secondMinutes;
  document.title = `${twoNumbers(originalMinutes)}:${twoNumbers(originalSeconds)}`;
  originalValues();
});

timerCustom.addEventListener('change', () => {useTimerCustom()});
timerCustom.addEventListener('keypress', () => {useTimerCustom()});

function useTimerCustom () {
  if (timerCustom.value == false) {
    originalValues();
  } else {
    minutes = timerCustom.value.slice(0,2);
    if (minutes < 10) {
      minutes = timerCustom.value.slice(1,2);
    }

    seconds = timerCustom.value.slice(3);
    if (seconds < 10) {
      seconds = timerCustom.value.slice(4);
    }

    minutes = twoNumbers(minutes);
    seconds = twoNumbers(seconds);

    domMin.textContent = minutes;
    domSec.textContent = seconds;
    document.title = `${minutes}:${seconds}`;
  }
}