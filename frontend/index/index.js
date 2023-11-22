const apiKey = "dict.1.1.20231109T112224Z.29274f5d10012b29.4392e34eeeca675b956085a6d08725a74d626ad4";

const languages = {
    'ru-en': 'RUSSIA-ENGLISH',
    'en-ru': 'ENGLISH-RUSSIA'
};

let direction = JSON.parse(localStorage.getItem('direction')) ?? 'en-ru';

const wordList = JSON.parse(localStorage.getItem('wordList')) ?? [];

const input = document.getElementById(`input-word`);
const answer = document.getElementById(`translation`);

renderDirection();

function onchangeInput() {
    LookUp();
}

async function LookUp() {
    const text = input.value;
    if (text === '') {
        answer.textContent = '';
        return;
    }
    const apiUrl = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${apiKey}&lang=${direction}&text=${text}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        answer.textContent = data.def[0].tr[0].text;
    } catch (e) {
        console.error(e);
        return
    }
    addToMyWords();
}

function switchLanguage() {
    direction = direction.split('-').reverse().join('-');
    input.value = '';
    answer.textContent = '';

    renderDirection();
}

function renderDirection() {
    const parent = document.querySelector('.switcher').parentElement;
    const children = parent.children;

    const langList = languages[direction].split('-');
    children[0].innerHTML = langList[0];
    children[2].innerHTML = langList[1];

    localStorage.setItem('direction', JSON.stringify(direction));
}

function addToMyWords() {
    if (input.value === '') return;
    if (answer.textContent === '') return;
    console.log(answer.textContent);
    checkSimilarWords();
}

function localStorageAppend(newItem) {
    wordList.push(newItem);
    localStorage.setItem('wordList', JSON.stringify(wordList));
}

function checkSimilarWords() {
    const foundItem = wordList.find(item => {
        if (direction === 'en-ru') {
            return item.en === input.value;
        } else {
            return item.en === answer.textContent;
        }
    });

    if (!foundItem) {
        const newItem = {
            en: (direction === 'en-ru') ? input.value : answer.textContent,
            ru: (direction === 'en-ru') ? answer.textContent : input.value,
            state: 'unmark'
        };
        localStorageAppend(newItem);
    }
}