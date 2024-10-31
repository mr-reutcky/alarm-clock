'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

const time = select('.time');
const alarmTime = select('.alarm-time');
const hours = select('.hours');
const minutes = select('.minutes');
const setAlarm = select('.set-alarm');

const alarmSound = new Audio('./src/audio/alarm-sound.mp3');
alarmSound.type = 'audio/mp3';

let alarmHour = null;
let alarmMinute = null;

function getTime() {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  return new Date().toLocaleString('en-ca', options);
}

function isValidTime(hour, minute) {
  const enteredHour = parseInt(hour, 10);
  const enteredMin = parseInt(minute, 10);
  const isValidHour = enteredHour >= 0 && enteredHour <= 23;
  const isValidMinute = enteredMin >= 0 && enteredMin <= 59;

  return isValidHour && isValidMinute;
}

setAlarm.addEventListener('click', () => {
  const hour = hours.value;
  const minute = minutes.value;

  if (isValidTime(hour, minute)) {
    alarmTime.innerText =  
      ` ${hours.value.padStart(2, '0')}:${minutes.value.padStart(2, '0')}`;
    hours.value = '';
    hours.classList.remove('invalid');
    minutes.value = '';
    minutes.classList.remove('invalid');
    alarmHour = hour;
    alarmMinute = minute;
  } else {
    hours.value = '';
    hours.classList.add('invalid');
    minutes.value = '';
    minutes.classList.add('invalid');
  }
});

function checkAlarm() {
  const currentDate = new Date();
  const currentHour = currentDate.getHours().toString().padStart(2, '0'); 
  const currentMinute = currentDate.getMinutes().toString().padStart(2, '0');

  if (currentHour === alarmHour && currentMinute === alarmMinute) {
    alarmSound.play();
    alarmTime.innerText = '';
    alarmHour = null;
    alarmMinute = null;
  }
}

function updateTime() {
  time.innerText = getTime();
  checkAlarm()
}

setInterval(updateTime, 1000);

updateTime();