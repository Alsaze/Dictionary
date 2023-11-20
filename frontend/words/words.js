const wordList = JSON.parse(localStorage.getItem('wordList')) ?? [];

function createRow(index, en, ru) {
    const table = document.querySelector('.table-content');

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

    const buttonElTr = document.createElement('td');
    parentEl.appendChild(buttonElTr);

    const buttonEl = document.createElement('button');
    buttonElTr.appendChild(buttonEl)

    const imgButtonEl = document.createElement("img");
    buttonEl.appendChild(imgButtonEl);

    imgButtonEl.src = "../img/cross.svg";
}

function render() {
    for (let index = 0; index < wordList.length; index++) {
        createRow(index, wordList[index].en, wordList[index].ru);
    }
}

render();