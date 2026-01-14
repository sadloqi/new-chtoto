'use strict';

let quiz = document.querySelector('#unicorn-quiz');
let pages = document.querySelectorAll('.page');
let currentPage = 0;

// Показываем первую страницу
pages[currentPage].style.display = 'block';


// Обработчики кнопок "Далее" и "Назад"
document.querySelectorAll('.next-page').forEach(button => {
    button.addEventListener('click', () => {
        if (currentPage < pages.length - 1) {
            pages[currentPage].style.display = 'none';
            currentPage++;
            pages[currentPage].style.display = 'block';
        }
    });
});

document.querySelectorAll('.prev-page').forEach(button => {
    button.addEventListener('click', () => {
        if (currentPage > 0) {
            pages[currentPage].style.display = 'none';
            currentPage--;
            pages[currentPage].style.display = 'block';
        }
    });
});


quiz.addEventListener('submit', (event) => {
    event.preventDefault();

    let answers = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        q3: document.querySelector('input[name="q3"]:checked')?.value,
        q4: document.querySelector('input[name="q4"]:checked')?.value,
        q5: document.querySelector('input[name="q5"]:checked')?.value
    };

    let result = document.querySelector('#result');

    if (!answers.q1 || !answers.q2 || !answers.q3 || !answers.q4 || !answers.q5) {
        result.innerHTML = '<p>Пожалуйста, ответьте на все вопросы!</p>';
        return;
    }

    let aCount = 0;
    let bCount = 0;
    let cCount = 0;

    for (let key in answers) {
        if (answers[key] === 'А') {
            aCount++;
        } else if (answers[key] === 'Б') {
            bCount++;
        } else if (answers[key] === 'В') {
            cCount++;
        }
    }

    let unicornType;
    if (aCount >= bCount && aCount >= cCount) {
        unicornType = '<h2>Весёлый радужный единорог</h2><p>Ты обожаешь шумные компании, весёлые игры и новые приключения. Тебе нравится быть в центре событий и делиться радостью с друзьями. Даже обычный день ты превращаешь в праздник, потому что у тебя море идей. С тобой всегда весело и светло, словно вокруг появляется настоящая радуга!</p>';
    } else if (bCount >= aCount && bCount >= cCount) {
        unicornType = '<h2>Уютный мечтательный единорог</h2><p>Ты любишь спокойные вечера, мягкие пледы и вкусный чай. Твои мечты полны волшебных историй, и ты умеешь придумывать целые миры. Друзья ценят твою доброту и умение слушать. С тобой рядом всегда становится тепло и спокойно, как в самой уютной сказке.</p>';
    } else {
        unicornType = '<h2>Смелый снежный единорог</h2><p>Ты не боишься трудностей и готов пробовать новое. Любишь активные игры, спорт и весёлые прогулки на свежем воздухе. С тобой никогда не бывает скучно, потому что ты всегда готов к новым открытиям. Ты как зимнее солнце — яркий, бодрый и дарящий энергию окружающим.</p>';
    }

    result.innerHTML = unicornType;
});
