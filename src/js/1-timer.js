import flatpickr from "flatpickr"; 
import iziToast from "izitoast";

let userSelectedDate;
const datetimeBtn = document.querySelector('.datetime-btn');

const flatpickrOptions = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        const currentDate = checkDate(); 
        if (currentDate) {  
            startTimer(currentDate); 
        }
    },
};

const iziToastOptions = {
    title: "Error",
    titleColor: '#fff',
    titleSize: "16px",
    titleLineHeight: "1.5",
    message: "Illegal operation",
    backgroundColor: "#ef4040",
    color: "white",
    messageColor: "#fff",
    messageSize: "16px",
    messageLineHeight: "1.5",
    iconUrl: new URL('../img/error.svg', import.meta.url).href,
    iconColor: "#fff",
    close: true,
    closeOnEscape: true,
    progressBarColor: "#b51b1b",
    position: "topRight",
    timeout: 5000,
    animateInside: false,
    transitionIn: "bounceInLeft"
};

flatpickr("#datetime-picker", flatpickrOptions);

function checkDate() {
    const currentDate = new Date();
    if (userSelectedDate <= currentDate) {
        datetimeBtn.setAttribute("disabled", "disabled");
        iziToast.show(iziToastOptions);
        return false; 
    } else {
        datetimeBtn.removeAttribute("disabled");
        return currentDate; 
    }
}

function startTimer(currentDate) {
    const timeTimer = userSelectedDate - currentDate;

    const secondsEl = document.querySelector("[data-seconds]");
    const minutesEl = document.querySelector("[data-minutes]");
    const hoursEl = document.querySelector("[data-hours]");
    const daysEl = document.querySelector("[data-days]");

    let timeLeft = timeTimer;

    setDate();
    const datetimeInput = document.querySelector('.datetime-input');
    datetimeInput.setAttribute("disabled", "disabled");
    datetimeBtn.setAttribute("disabled", "disabled");

    const timer = setInterval(() => {
        timeLeft -= 1000;

        if (timeLeft <= 0) {
            clearInterval(timer); 
            secondsEl.textContent = "00";
            minutesEl.textContent = "00";
            hoursEl.textContent = "00";
            daysEl.textContent = "00";
            datetimeInput.removeAttribute("disabled");
        } else {
            setDate();
        }
    }, 1000);

    function setDate() {
        const timeTimerObject = convertMs(timeLeft);
        const { days, hours, minutes, seconds } = timeTimerObject;
        secondsEl.textContent = seconds;
        minutesEl.textContent = minutes;
        hoursEl.textContent = hours;
        daysEl.textContent = days;
    }
}

function convertMs(ms) {
    // Кількість мілісекунд в одиниці часу
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Дні
    const days = String(Math.floor(ms / day)).padStart(2, "0");
    // Години
    const hours = String(Math.floor((ms % day) / hour)).padStart(2, "0");
    // Хвилини
    const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(2, "0");
    // Секунди
    const seconds = String(Math.floor((((ms % day) % hour) % minute) / second)).padStart(2, "0");

    return { days, hours, minutes, seconds };
}
