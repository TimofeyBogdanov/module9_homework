// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:

// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.
// Пример. Если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
// После получения данных вывести список картинок на экран.

// Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).

function init() {

    let imgDiv = document.querySelector(".images");
    let warn = document.querySelector(".warn");
    let btn = document.querySelector(".btn");
    let inputs = document.querySelectorAll(".input");

    if (localStorage.getItem('data')) {
        imgDiv.innerHTML = localStorage.getItem('data');
    }

    function useRequest() {
        let values = [];
        inputs.forEach(item => values.push(+item.value));
        let reqUrl = `https://picsum.photos/v2/list?page=${values[0]}&limit=${values[1]}`;
        if (!((values[0] >= 1 && values[0] <= 10) || (values[1] >= 1 && values[1] <= 10))) {
            warn.textContent = "Номер страницы и лимит вне диапазона от 1 до 10";
        } else if (!(values[0] >= 1 && values[0] <= 10)) {
            warn.textContent = "Номер страницы вне диапазона от 1 до 10";
        } else if (!(values[1] >= 1 && values[1] <= 10)) {
            warn.textContent = "Лимит вне диапазона от 1 до 10";
        } else {
            warn.style.display = "none";
            fetch(reqUrl)
                .then(response => response.json())
                .then(data => {
                    let imgMarkup = '';
                    data.forEach(item => {
                        let image = `<img class="img" src=${item.download_url} width="300">`;
                        imgMarkup += image;
                    });
                    imgDiv.innerHTML = imgMarkup;
                    localStorage.setItem('data', imgMarkup);
                })
                .catch(() => console.log("Ошибка запроса!"))
        }
    }

    btn.addEventListener('click', useRequest);

}

document.addEventListener('DOMContentLoaded', init);