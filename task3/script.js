// Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
// Пример. Если пользователь ввёл 5, то запрос будет вида: https://picsum.photos/v2/list?limit=5.
// После получения данных вывести ниже картинки на экран.

// Подсказка

// Получение данных из input:

// const value = document.querySelector('input').value;

let imgDiv = document.querySelector(".images");
let warnDiv = document.querySelector(".warn");
let btn = document.querySelector(".btn");

function useRequest() {
    let value = +document.querySelector(".input").value;
    let reqUrl = "https://picsum.photos/v2/list?limit=" + value;
    if (!(value >= 1 && value <= 10)) {
        warnDiv.style.display = "block";
    } else {
        warnDiv.style.display = "none";
        let xhr = new XMLHttpRequest();
        xhr.open('get', reqUrl);
        xhr.send();
        xhr.onload = function () {
            if (xhr.status != 200) {
                console.log("Статус ответа: " + xhr.status);
            } else {
                let resp = JSON.parse(xhr.response);
                let imgMarkup = '';
                resp.forEach(item => {
                    let image = `<img class="img" src=${item.download_url} width="300">`;
                    imgMarkup += image;
                });
                imgDiv.innerHTML = imgMarkup;
            }
        }
        xhr.onerror = function () {
            console.log("Ошибка! Статус ответа: " + xhr.status);
        }
    }
}

btn.addEventListener('click', useRequest);