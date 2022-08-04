const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const msg1 = document.querySelector('#message1');
const msg2 = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    msg1.textContent = 'Loading...';
    msg2.textContent = '';

    const inputVal = input.value;
    // console.log(location);

    fetch('/weather?address=' + inputVal).then((res) => {
        res.json().then((data) => {
            if(data.error){
                msg1.textContent = data.error;
                return;
                // console.log(data.error);
            }
            msg1.textContent = data.location;
            msg2.textContent = data.forecast;
            // console.log(data.location),
            // console.log(data.forecast)
        })
    })
})