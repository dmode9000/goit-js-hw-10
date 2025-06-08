import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form.snackbar');
console.log(form);
form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = +form.elements.delay.value;
  const selectedState = form.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delayValue => {
      iziToast.success({
        message: `Fulfilled promise in ${delayValue}ms`,
        position: 'topCenter',
        theme: 'dark',
        backgroundColor: '#59a10d',
      });
      console.log(`✅ Fulfilled promise in ${delayValue}ms`);
    })
    .catch(delayValue => {
      iziToast.error({
        message: `Rejected promise in ${delayValue}ms`,
        position: 'topCenter',
        theme: 'dark',
        backgroundColor: '#ef4040',
      });
      console.log(`❌ Rejected promise in ${delayValue}ms`);
    });
});
