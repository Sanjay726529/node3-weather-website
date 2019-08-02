
const weatherForm = document.querySelector('form');
const searchLocation = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const location = searchLocation.value;

    messageOne.textContent = 'Fethching..'
    messageTwo.textContent = ''

    fetch("/weather?address="+ location ).then((response) => {

    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
            //messageTwo.textContent = '';
        } else {
            const newline = "\r\n"
            messageOne.textContent = data.placeName;
            messageTwo.textContent = "Weather Summary: " + data.summary + newline + "Possibility of rain: " + data.rainPossibility
            + newline + "Temperature: " + data.currentTemp + newline + "Humidity: " + data.humidity + newline + "Wind Speed: " + data.windSpeed;
        }
    })
})
})