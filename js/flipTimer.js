const btnStart = document.querySelector('.timerStart');
const btnStop = document.querySelector('.timerStop');

// Найдите элементы DOM
const elHours = document.querySelector('.timer__hours');
const elMinutes = document.querySelector('.timer__minutes');
const elSeconds = document.querySelector('.timer__seconds');

// Длительность таймера в миллисекундах (2 705 000 мс = 45 минут 5 секунд)
const TIMER_DURATION = 2705000;

let deadline = null; // Дедлайн будет вычисляться при старте
let timerId = null;

// Функция склонения числительных
const declensionNum = (num, words) => {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]];
};

// Функция обновления таймера
const updateTimer = () => {
    const now = new Date().getTime();
    const diff = Math.max(0, deadline - now);

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    elHours.textContent = String(hours).padStart(2, '0');
    elMinutes.textContent = String(minutes).padStart(2, '0');
    elSeconds.textContent = String(seconds).padStart(2, '0');

    elHours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
    elMinutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
    elSeconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);

    if (diff === 0) {
        clearInterval(timerId);
        timerId = null;
    }
};

btnStart.addEventListener('click', function () {
    if (timerId) return; // Защита от повторного запуска

    // Вычисляем дедлайн: текущее время + длительность таймера
    deadline = new Date().getTime() + TIMER_DURATION;

    updateTimer(); // Обновляем сразу, чтобы не ждать секунду
    timerId = setInterval(updateTimer, 1000);
});

btnStop.addEventListener('click', function () {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        deadline = null; // Сбрасываем дедлайн

        elHours.textContent = '00';
        elMinutes.textContent = '00';
        elSeconds.textContent = '00';

        elHours.dataset.title = 'часов';
        elMinutes.dataset.title = 'минут';
        elSeconds.dataset.title = 'секунд';
    }
});