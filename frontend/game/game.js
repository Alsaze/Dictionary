const wordList = JSON.parse(localStorage.getItem('wordList')) ?? [];
let text = document.getElementById('card');

renderWord();

function renderWord() {
    try {
        text.innerHTML = (wordList[0].en);
    } catch (e) {
        console.log(e);
        text.innerHTML = '...';
    }
}

function buttonUnconfirmed() {
    const tempWord = wordList.shift();
    tempWord.state = 'negative';
    renderWord();
    wordList.push(tempWord);

    localStorage.setItem('wordList', JSON.stringify(wordList));
}

function buttonConfirmed() {
    const tempWord = wordList.shift();
    tempWord.state = 'positive';
    renderWord();
    wordList.push(tempWord);

    localStorage.setItem('wordList', JSON.stringify(wordList));
}

function buttonNext() {
    const tempWord = wordList.shift();
    renderWord();
    wordList.push(tempWord);

    localStorage.setItem('wordList', JSON.stringify(wordList));
}

function validate() {
    const input = document.getElementById(`validate-input`);
    if (input.value === '') return;

    if (wordList[0].ru === input.value) {
        console.log('good');
        input.value = '';
        buttonConfirmed();
    } else {
        console.log('bad');
    }
}