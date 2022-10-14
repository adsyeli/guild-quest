const draggable_list = document.getElementById('draggable-list');

const allTubs = [
    '/tubs/blue-spark.png',
    '/tubs/Grape-Blast.png',
    '/tubs/Seismic-Cola.png',
    '/tubs/Razor-Melon.png',
    '/tubs/Slash-Berry.png',
    '/tubs/Final-Flash.png',
    '/tubs/Sucker-Punch.png',
    '/tubs/Bubble-Beam.png',
    '/tubs/Dragon-Rage.png',
    '/tubs/Sweet-Kiss.png',
    '/tubs/Jaw-Breaker.png',
    '/tubs/Citrus-Bomb.png',
    '/tubs/Neon-Dimensions.png',
    '/tubs/aussie-antics.png'
];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
    [...allTubs]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((tub, index) => {
            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
        <div class="draggable" draggable="true">
        <img  class="tub-name" src="${tub}">
        </div>
      `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        });

    addEventListeners();
}

function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
}

function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
}

function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
}

function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const tubName = listItem.querySelector('.draggable').innerText.trim();

        if (tubName !== allTubs[index]) {
            alert("Correct!");
        } else {
            alert("Wrong!");
        }
    });
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}