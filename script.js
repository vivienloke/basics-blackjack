var mode = "first card";
var cards = "";
//////// PLAYER //////////
var playerCard = "";
var playerHand = [];
var playerFirstCard = "";
var playerAddedCard = "";
var showPlayerHand = ""; //Player Card #2 onwards//
var addPlayerRank = ""; //Player Card Rank #2 onwards//
var showPlayerRank = ""; //Total Player Rank//
//////// COMPUTER //////////
var computerCard = "";
var computerHand = [];
var computerFirstCard = "";
var computerAddedCard = "";
var showComputerHand = ""; //Com Card #2 onwards//
var addComputerRank = ""; //Com Card Rank #2 onwards//
var showComputerRank = ""; //Total Com Rank//

var main = function (input) {
  // HIT OR STAND MODE FOR PLAYER TO CHOOSE
  if (mode == "hit or stand") {
    var myOutputvalue = runPlayerChoice(input);
    return myOutputvalue;
  }
  // COMPARE CARDS TO DETERMINE WINNER
  if (mode == "determine winner") {
    var myOutputvalue = determineWinner(input);
    return myOutputvalue;
  }

  // Mode starts with "first card" to distribute 1 card each to player and computer first
  if ((mode = "first card")) {
    // First I need to start with a shuffled deck
    cards = shuffleCards(makeDeck());

    // Pop first card each for player and com
    computerCard = cards.pop();
    computerHand.push(computerCard);

    i = 1;
    while (showComputerRank < 15) {
      computerCard = cards.pop();
      computerHand.push(computerCard);
      computerAddedCard = `${computerHand[i].name} of ${computerHand[i].suit}`;
      computerFirstCard = `${computerCard.name} of ${computerCard.suit}`;
      showComputerHand += computerAddedCard;
      addComputerRank += Number(computerHand[i].rank);
      showComputerRank =
        parseInt(computerHand[0].rank) + parseInt(addComputerRank);
      console.log(`show computer hand: ${showComputerHand}`);
      console.log(`show computer rank: ${showComputerRank}`);
      i += 1;
      if (showComputerRank > 21) {
        return `Player wins!<br><br>Player Hand: ${playerFirstCard} ${showPlayerHand}<br>Computer Hand: ${computerFirstCard} ${showComputerHand}`;
      }
    }

    playerCard = cards.pop();
    playerHand.push(playerCard);
    console.log(
      `Computer Card: ${computerCard.name} of ${computerCard.suit}. Player Card: ${playerCard.name} of ${playerCard.suit}`
    );
    console.log(
      `Computer Hand: ${computerHand[0].name} of ${computerHand[0].suit}. Player Hand: ${playerHand[0].name} of ${playerHand[0].suit}`
    );

    // Next game mode 1: Hit > give one card to player. Otherwise game mode 2: stand > end player turn
    mode = "hit or stand";
    return `Your first card is ${playerCard.name} of ${playerCard.suit}, and the computer's first card is ${computerCard.name} of ${computerCard.suit}.<br><br>Key in 'hit' to get another card, or key in 'stand' to end your turn.<br><br>Current Player Hand: ${playerHand[0].name} of ${playerHand[0].suit}`;
  }
};

//----------------------------------------//
/////// RUN FUNCTION TO SEE WHO WINS///////
//--------------------------------------//

var determineWinner = function () {
  if (
    showPlayerRank > showComputerRank &&
    showPlayerRank < 22 &&
    showComputerRank < 22
  ) {
    return `Player wins!<br><br>Player Hand: ${playerFirstCard} ${showPlayerHand}<br>Computer Hand: ${computerFirstCard} ${showComputerHand}`;
  }
  if (addedScorePlayer < showComputerRank && showComputerRank < 22) {
    return `Computer wins!<br><br>Player Hand: ${playerFirstCard} ${showPlayerHand}<br>Computer Hand: ${computerFirstCard} ${showComputerHand}`;
  }
  if (addedScorePlayer > 21) {
    return `Player loses!<br><br>Player Hand: ${playerFirstCard} ${showPlayerHand}<br>Computer Hand: ${computerFirstCard} ${showComputerHand}`;
  }
  if (showComputerRank > 21) {
    return `Player wins!<br><br>Player Hand: ${playerFirstCard} ${showPlayerHand}<br>Computer Hand: ${computerFirstCard} ${showComputerHand}`;
  }
};

//------------------------------------------//
/////// RUN IF FUNCTION: HIT OR STAND ///////
//----------------------------------------//

var index = 1;

var runPlayerChoice = function (input) {
  if (input == "hit") {
    var playerAddedCard = cards.pop();
    playerHand.push(playerAddedCard);
    console.log(`${playerHand[1].name} of ${playerHand[1].suit}`);

    while (index < playerHand.length) {
      playerAddedCard = `${playerHand[index].name} of ${playerHand[index].suit}`;
      playerFirstCard = `${playerCard.name} of ${playerCard.suit}`;
      showPlayerHand += playerAddedCard;
      addPlayerRank += parseInt(playerHand[index].rank);
      showPlayerRank = parseInt(playerHand[0].rank) + parseInt(addPlayerRank);
      console.log(showPlayerHand);
      console.log(showPlayerRank);
      if (showPlayerRank > 21 && showComputerRank < 21) {
        mode = "first card";
        return `Oh no you burst! Hit "Submit" button to try again!`;
      }
      index += 1;
      return `You have chosen to "hit", and your additional card is ${playerAddedCard}. <br><br>Current Player Hand: ${playerFirstCard} ${showPlayerHand} (Total Sum: ${showPlayerRank})<br><br> Total number of card drawn by computer: ${computerHand.length}`;
    }
  } else if (input == "stand") {
    mode = "determine winner";
    return `You have chosen to "stand". Click the "Submit" button to see if you win!<br><br>Current Player Hand: ${playerFirstCard} ${showPlayerHand} (Total Sum: ${showPlayerRank})`;
  } else input != "hit" && input != "stand";
  return 'Pls key in only either "hit" or "stand" to proceed.';
};

//-------------------------------//
/////// MAKE DECK FUNCTION ///////
//-------------------------------//

var makeDeck = function () {
  var cardDeck = [];

  // var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suits = ["Hearts ❤️", "Diamonds ♦️", "Clubs ♣️", "Spades ♠️"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

//----------------------------------//
////////// SHUFFLING DECK ///////////
//----------------------------------//

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};
