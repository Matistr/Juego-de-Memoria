const symbols = ['🍎', '🍌', '🍇', '🍒', '🍉', '🍋', '🍓', '🍑'];
const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
let cardValues = [...symbols, ...symbols];
let attempts = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    board.innerHTML = ''; 
    shuffle(cardValues);
    cardValues.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        
        let colorClass = getColorClass(symbol);
        card.classList.add(colorClass);

        card.innerHTML = `
            <div class="front">${symbol}</div>
            <div class="back"></div>
        `;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
    attempts = 0;
    document.getElementById('attempts').textContent = `Intentos: ${attempts}`;
}

function getColorClass(symbol) {
    switch (symbol) {
        case '🍎': return 'apple';
        case '🍌': return 'banana';
        case '🍇': return 'grape';
        case '🍒': return 'cherry';
        case '🍉': return 'watermelon';
        case '🍋': return 'lemon';
        case '🍓': return 'strawberry';
        case '🍑': return 'peach';
        default: return '';
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;
    isMatch ? disableCards() : unflipCards();
    attempts++;
    document.getElementById('attempts').textContent = `Intentos: ${attempts}`;

    if (document.querySelectorAll('.card.flip').length === cardValues.length) {
        setTimeout(() => alert('¡Felicidades! Has encontrado todas las parejas.'), 300);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

resetButton.addEventListener('click', () => {
    resetGame();
});

function resetGame() {
    cardValues = [...symbols, ...symbols];
    shuffle(cardValues);
    createBoard();
}

createBoard();
