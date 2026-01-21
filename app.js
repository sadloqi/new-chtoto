'use strict';

let quiz = document.querySelector('#unicorn-quiz');
let pages = document.querySelectorAll('.page');
let currentPage = 0;

pages[currentPage].style.display = 'block';

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
        result.innerHTML = '<p>Ты ответил не на все вопросы!</p>';
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
        unicornType = '<h2>Уже лучше</h2><p>Ты близок к победе, но все еще впереди</p>';
    } else if (bCount >= aCount && bCount >= cCount) {
        unicornType = '<h2>Имба</h2><p>Красава! А у тебя вообще есть личная жизнь?</p>';
    } else {
        unicornType = '<h2>Печально :(</h2><p>Иди аниме посмотри</p>';
    }

    result.innerHTML = unicornType;
});
document.addEventListener('DOMContentLoaded', function () {
    const pages = document.querySelectorAll('.page');
    let currentPageIndex = 0;

    function updateNextButton() {
        const currentPage = pages[currentPageIndex];
        const nextButton = currentPage.querySelector('.next-page');
        const radioButtons = currentPage.querySelectorAll('input[type="radio"]');

        const isAnyChecked = Array.from(radioButtons).some(radio => radio.checked);
        nextButton.disabled = !isAnyChecked;
    }

    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function () {
            const page = this.closest('.page');
            const index = Array.from(pages).indexOf(page);
            if (index === currentPageIndex) {
                updateNextButton();
            }
        });
    });

    document.querySelectorAll('.next-page').forEach(button => {
        button.addEventListener('click', function () {
            if (currentPageIndex < pages.length - 1) {
                pages[currentPageIndex].style.display = 'none';
                currentPageIndex++;
                pages[currentPageIndex].style.display = 'block';
                updateNextButton(); 
            }
        });
    });

    document.querySelectorAll('.prev-page').forEach(button => {
        button.addEventListener('click', function () {
            if (currentPageIndex > 0) {
                pages[currentPageIndex].style.display = 'none';
                currentPageIndex--;
                pages[currentPageIndex].style.display = 'block';
                updateNextButton(); 
            }
        });
    });

    updateNextButton();
});
if (currentPageIndex === pages.length - 1) {
    const submitButton = currentPage.querySelector('#show-result');
    submitButton.disabled = !isAnyChecked;
} else {
    nextButton.disabled = !isAnyChecked;
}
