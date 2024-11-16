import iziToast from 'izitoast';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
	event.preventDefault();

	const delayElValue = form.elements.delay.value;
	const fulfilledElChecked = form.querySelector('[value=fulfilled]').checked;

	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			if (fulfilledElChecked) {
				resolve(delayElValue);
			} else {
				reject(delayElValue);
			}
		}, delayElValue);
	});

	promise
		.then(delay => {
			iziToast.show({
				class: 'fulfilled',
				title: 'OK',
				titleColor: '#fff',
				titleSize: '16px',
				titleLineHeight: '1.5',
				message: `Fulfilled promise in ${delay}ms`,
				backgroundColor: '#59a10d',
				color: 'white',
				messageColor: '#fff',
				messageSize: '16px',
				messageLineHeight: '1.5',
				iconUrl: new URL('../img/ok.svg', import.meta.url).href,
				iconColor: '#fff',
				close: true,
				closeOnEscape: true,
				progressBarColor: '#326101',
				position: 'topRight',
				timeout: 4000,
				animateInside: false,
				transitionIn: 'bounceInLeft'
			});
		})
		.catch(delay => {
			iziToast.show({
				class: 'rejected',
				title: 'Error',
				titleColor: '#fff',
				titleSize: '16px',
				titleLineHeight: '1.5',
				message: `Rejected promise in ${delay}ms`,
				backgroundColor: '#ef4040',
				color: 'white',
				messageColor: '#fff',
				messageSize: '16px',
				messageLineHeight: '1.5',
				iconUrl: new URL('../img/error.svg', import.meta.url).href,
				iconColor: '#fff',
				close: true,
				closeOnEscape: true,
				progressBarColor: '#b51b1b',
				position: 'topRight',
				timeout: 4000,
				animateInside: false,
				transitionIn: 'bounceInLeft'
			});
		});
})