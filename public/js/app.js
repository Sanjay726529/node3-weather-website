
const weatherForm = document.querySelector('form');
const searchLocation = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const location = searchLocation.value;

    messageOne.textContent = 'Fethching..'
    messageTwo.textContent = ''

    fetch("http://localhost:3000/weather?address="+ location ).then((response) => {

    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
            //messageTwo.textContent = '';
        } else {
            messageOne.textContent = data.placeName;
            messageTwo.textContent = data.weatherSummary;
        }
    })
})
})