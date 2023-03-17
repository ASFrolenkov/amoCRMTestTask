const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = (time) => {
	const {seconds, minutes, hours} = dateConstructor(time);
	timerEl.textContent = `${hours}:${minutes}:${seconds}`;
};

//Создание часов, минут и секунд
function dateConstructor(allSeconds) {
	const seconds = addZero(Math.floor(allSeconds % 60)),
		  minutes = addZero(Math.floor((allSeconds / 60) % 60)),
		  hours = addZero(Math.floor((allSeconds / 60 / 60)));

	return {seconds, minutes, hours};
}

//Добавление 0 в начало строки
function addZero(num) {
	if (num <= 9) {
		return '0' + num;
	} else {
		return num;
	};
};

//Интервал шага таймера
const intervalFunction = (time) => {
	const intervalId = setInterval(() => {
		if (time <= 0) {
			createTimerAnimator(0);
			clearInterval(intervalId);
		} else {
			createTimerAnimator(time);
			time--;
		};	
	}, 1000) 

	return intervalId;
}

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  	inputEl.value = inputEl.value.replace(/\D/, '');
});

//Массив для хранения ID интервалов 
let arr = []

buttonEl.addEventListener('click', () => {
	let seconds = Number(inputEl.value);
	//Отображение таймера на странице 
	createTimerAnimator(seconds);
	//Запуск интервала и получение его ID
	const intervalId = intervalFunction(--seconds);
	//Добавление ID интервала в массив
	arr.push(intervalId);

	//Условие для сброса предыдущего интервала 
	if (arr.length > 1) {
		clearInterval(arr.shift());
		arr = [arr.pop()];
	};

	inputEl.value = '';
});
