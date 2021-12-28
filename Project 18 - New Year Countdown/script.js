const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownEl = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

year.textContent = currentYear + 1;

const updateCountdown = () => {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  daysEl.textContent = days;
  hoursEl.textContent = hours < 10 ? '0' + hours : hours;
  minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
  secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
};

setTimeout(() => {
  loading.remove();
  countdownEl.style.display = 'flex';
}, 1000);

setInterval(updateCountdown, 1000);
