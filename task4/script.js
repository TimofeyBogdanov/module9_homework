// Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.

// При клике на кнопку происходит следующее:

// Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
// Пример. Если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
// После получения данных вывести ниже картинку на экран.

// Подсказка

// Получение данных из input:

// const value = document.querySelector('input').value;

let imgDiv = document.querySelector(".random-image");
let warnDiv = document.querySelector(".warn");
let btn = document.querySelector(".btn");
let inputs = document.querySelectorAll(".input");

function useRequest() {
    let values = [];
    inputs.forEach(item => values.push(+item.value));
    let reqUrl = `https://picsum.photos/${values[0]}/${values[1]}`;
    if (!((values[0] >= 100 && values[0] <= 300) && (values[1] >= 100 && values[1] <= 300))) {
        warnDiv.style.display = "block";
    } else {
        warnDiv.style.display = "none";
        fetch(reqUrl)
            .then(response => {
                let image = `<img src=${response.url}>`;
                imgDiv.innerHTML = image;
            })
            .catch(() => console.log("Ошибка запроса!"))
    }
}

btn.addEventListener('click', useRequest);