const apiKey = "dict.1.1.20231109T112224Z.29274f5d10012b29.4392e34eeeca675b956085a6d08725a74d626ad4";

const languages = {
    'ru-en': 'РУССКИЙ-АНГЛИЙСКИЙ',
    'en-ru': 'АНГЛИЙСКИЙ-РУССКИЙ'
};

let direction = 'en-ru';

let wordsList = [
    // {en: 'snow', ru: 'снег'},
    // {en: 'apple', ru: 'яблоко'}
];

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
    }
}

function switchLanguage() {
    direction = direction.split('-').reverse().join('-');
    input.value = '';
    answer.textContent = '';

    renderDirection();
}

function renderDirection() {
    const parent = document.getElementById('switcher').parentElement;
    const children = parent.children;

    const langList = languages[direction].split('-');
    children[0].innerHTML = langList[0];
    children[2].innerHTML = langList[1];
}

function buttonSaveList() {
    if (input.value === '') return;
    if (answer.textContent === '') return;
    checkSimilarWords()
    localStorage.setItem('wordList', JSON.stringify(wordsList));
}

function checkSimilarWords() {
    const foundItem = wordsList.find(item => {
        if (direction === 'en-ru') {
            return item.en === input.value;
        } else {
            return item.en === answer.textContent;
        }
    });

    if (!foundItem) {
        const newItem = {
            en: (direction === 'en-ru') ? input.value : answer.textContent,
            ru: (direction === 'en-ru') ? answer.textContent : input.value
        };
        wordsList.push(newItem);
    }
}