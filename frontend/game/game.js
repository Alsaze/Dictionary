const wordList = JSON.parse(localStorage.getItem('wordList')) ?? [];
let text = document.querySelector('.card');

renderWord();

function renderWord() {
    try {
        text.innerHTML = (wordList[0].en);
    } catch (e) {
        console.log(e);
        text.innerHTML = '...';
    }
}

function buttonCheckTranslate() {
    try {
        if (text.innerHTML === (wordList[0].ru)) {
            text.innerHTML = (wordList[0].en);
        } else {
            text.innerHTML = (wordList[0].ru);
        }
    } catch (e) {
        console.log(e);
    }
}

function buttonNo() {
    const tempWord = wordList.shift();
    wordList.push(tempWord);
    localStorage.setItem('wordList', JSON.stringify(wordList));
    renderWord();

}

function buttonYes() {
    try {
        wordList.shift();
        localStorage.setItem('wordList', JSON.stringify(wordList));
        renderWord();
    } catch (e) {
        console.log(e);
    }
}