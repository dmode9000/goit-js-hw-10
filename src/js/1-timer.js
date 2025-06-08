import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
let spanDays = document.querySelector('.value[data-days]');
let spanHours = document.querySelector('.value[data-hours]');
let spanMinutes = document.querySelector('.value[data-minutes]');
let spanSeconds = document.querySelector('.value[data-seconds]');

let userSelectedDate;
startBtn.disabled = true;

startBtn.addEventListener('click', event => {
  if (userSelectedDate && !startBtn.disabled) {
    input.disabled = true;
    startBtn.disabled = true;

    iziToast.info({
      title: 'Timer Started',
      message: 'Countdown is now running!',
      position: 'topCenter',
    });

    startTimer();
  }
});

// start timer function
function startTimer() {
  const timer = setInterval(() => {
    const now = Date.now();
    const timeData = convertMs(userSelectedDate - now);

    const allZero = Object.values(timeData).every(value => value === 0);
    if (allZero) {
      updateTimerHTML(timeData);
      clearInterval(timer);
      input.disabled = false;
      iziToast.success({
        title: 'Success',
        message: 'Countdown completed!',
        position: 'topCenter',
      });
      return;
    }

    updateTimerHTML(timeData);
  }, 1000);
}

// flatpickr instance options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const curTime = Date.now();
    const selectedTime = selectedDates[0].getTime();

    if (curTime < selectedTime) {
      userSelectedDate = selectedTime;
      startBtn.disabled = false;

      const t = convertMs(selectedTime - curTime);
      updateTimerHTML(t);
    } else {
      startBtn.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const d = Math.floor(ms / day);
  // Remaining hours
  const h = Math.floor((ms % day) / hour);
  // Remaining minutes
  const m = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const s = Math.floor((((ms % day) % hour) % minute) / second);

  return { d, h, m, s };
}

// update span elements
function updateTimerHTML({ d, h, m, s }) {
  spanDays.textContent = String(d).padStart(2, '0');
  spanHours.textContent = String(h).padStart(2, '0');
  spanMinutes.textContent = String(m).padStart(2, '0');
  spanSeconds.textContent = String(s).padStart(2, '0');
}
