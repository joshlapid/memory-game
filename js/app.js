/*
 * Create a list that holds all of your cards
 */

let cardList = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 
					'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 
					'bicycle', 'bicycle', 'bomb', 'bomb'
				 ];

function createCard(card) {
	return `<li class="card" data-card="${card}"><i class="fa fa-${card}"></i></li>`
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startGame() {



	shuffle(cardList);
	let deck = document.querySelector('.deck');
	const cardHTML = cardList.map(function(card){
		return createCard(card);
	});

	deck.innerHTML = cardHTML.join('');


	const cards = document.querySelectorAll('.card');

	let cardsSelectedCounter = 0;
	let cardsSelected = [];
	let movesCounter = 0;
	let movesSuccess= 0;
	let timer = 0;
	let timerStart = 0;
	let gameTimer = 0;

	for (let i = 0; i < cards.length; i++) {

		const selectedCard = cards[i];
	
		// CARD SELECTION
		selectedCard.addEventListener('click', function(){

			// TIMER
			if (timerStart == 0) {
				gameTimer = setInterval(function(){
					timer++;
					console.log(timer);
				}, 1000)
				timerStart++;
			}

			if (!this.classList.contains('open') && !this.classList.contains('show') && !this.classList.contains('match') && cardsSelectedCounter != 2) {
				this.classList.add('open', 'show');
				cardsSelected.push(selectedCard);
				console.log(cardsSelected);
				cardsSelectedCounter++;

				if (cardsSelectedCounter == 2) {
					if( cardsSelected[0].dataset.card == cardsSelected[1].dataset.card) {
						cardsSelected[0].classList.add('match');
						cardsSelected[1].classList.add('match');
						cardsSelectedCounter = 0;
						cardsSelected = [];
						movesSuccess++;

						// WIN MODAL
						if (movesSuccess == 8) {
							document.querySelector('.win').classList.remove('hide');
							document.querySelector('.timer').innerText = timer + ' ' + 'seconds';
							clearInterval(gameTimer);
						}
					} else {
						setTimeout(function(){
							cardsSelected[0].classList.remove('open', 'show');
							cardsSelected[1].classList.remove('open', 'show');
							cardsSelectedCounter = 0;
							cardsSelected = [];
						}, 1000)

					}
					movesCounter++;
					document.querySelector('.moves').innerText = movesCounter;

					// STAR COUNTER LOGIC
					if (movesCounter > 8) {
						document.querySelector('.star-three').classList.add('hide');
					}

					if (movesCounter > 15) {
						document.querySelector('.star-two').classList.add('hide');
					}

					if (movesCounter > 20) {
						document.querySelector('.star-one').classList.add('hide');
					}
				}
			}
		});
	}
}

startGame();

const restartButton = document.querySelector('.restart');

restartButton.addEventListener('click', function() {
	document.querySelector('.moves').innerText = '0';
	document.querySelector('.win').classList.add('hide');
	startGame();
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


