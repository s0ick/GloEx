document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const selectCar = () => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) return;
                if(request.status === 200) resolve(request.responseText); 
                else reject('Произошла ошибка');
            });

            request.open('GET', './cars.json');
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
        });
    };    

    select.addEventListener('change', () => {
        selectCar()
            .then((result) => {
                const data = JSON.parse(result);
                data.cars.forEach(item => {
                    if (item.brand === select.value) {
                        const {brand, model, price} = item;
                        output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
                    }
                });
            })
            .catch(error => output.innerHTML = error);
    });
});
