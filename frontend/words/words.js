const wordList = JSON.parse(localStorage.getItem('wordList')) ?? [];

const table = document.querySelector('.table-content');

render();

function createRow(index, en, ru, state) {
    const parentEl = document.createElement("tr");
    table.appendChild(parentEl);

    const indexEl = document.createElement("td");
    parentEl.appendChild(indexEl);
    indexEl.innerHTML = index;

    const enWordEl = document.createElement('td');
    parentEl.appendChild(enWordEl);
    enWordEl.innerHTML = en;

    const ruWordEl = document.createElement('td');
    parentEl.appendChild(ruWordEl);
    ruWordEl.innerHTML = ru;

    //state
    const stateElTr = document.createElement('td');
    parentEl.appendChild(stateElTr);

    const stateElImg = document.createElement('img');
    stateElTr.appendChild(stateElImg);
    stateElImg.src = `../img/circle.svg`;

    if (state === 'positive') {
        stateElImg.className = 'img-positive';
    } else if (state === 'negative') {
        stateElImg.className = 'img-negative';
    } else {
        stateElImg.className = 'img-unmark';
    }

    //button
    const buttonElTr = document.createElement('td');
    parentEl.appendChild(buttonElTr);

    const buttonEl = document.createElement('button');
    buttonElTr.appendChild(buttonEl)

    const ButtonElImg = document.createElement("img");
    buttonEl.appendChild(ButtonElImg);
    ButtonElImg.src = '../img/trash.svg';

    buttonEl.onclick = () => {
        table.removeChild(table.children[index + 1]);

        wordList.splice(index, 1);
        localStorage.setItem('wordList', JSON.stringify(wordList));
        location.reload();
    };
}

function render() {
    for (let index = 0; index < wordList.length; index++) {
        createRow(index, wordList[index].en, wordList[index].ru, wordList[index].state);
    }
}