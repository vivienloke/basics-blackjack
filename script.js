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
      computerFirstCard = `${computerHand[0].name} of ${computerHand[0].suit}`;
      showComputerHand += computerAddedCard;
      addComputerRank += parseInt(computerHand[i].value);
      //--------------------------------------------------------------//
      ////////// SOME PROBLEMS WITH MY CALCULATIONSSSSS!!!! ////////////
      //-------------------------------------------------------------//
      showComputerRank =
        parseInt(computerHand[0].value) + parseInt(addComputerRank);
      console.log(`show computer hand: ${showComputerHand}`);
      console.log(`show computer rank: ${showComputerRank}`);
      i += 1;
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
    return `Your first card is ${playerHand[0].name} of ${playerHand[0].suit}, and the computer's first card is ${computerHand[0].name} of ${computerHand[0].suit}.<br><br>Key in 'hit' to get another card, or key in 'stand' to end your turn.<br><br>Current Player Hand: ${playerHand[0].name} of ${playerHand[0].suit}`;
  }
};

//-------------------------------------------------------//
/////// RUN FUNCTION TO SEE IF ACE 11 or 1 better? ///////
//-----------------------------------------------------//

//----------------------------------------//
/////// RUN FUNCTION TO SEE WHO WINS///////
//--------------------------------------//

var determineWinner = function () {
  mode = "first card";
  if (
    showPlayerRank > showComputerRank &&
    showPlayerRank < 22 &&
    showComputerRank < 22
  ) {
    return `Player wins!<br><br>Player Hand: ${playerFirstCard} ${showPlayerHand} (Total Sum: ${showPlayerRank})<br>Computer Hand: ${computerFirstCard} ${showComputerHand} (Total Sum: ${showComputerRank})<br><br>Click submit to restart the game and draw a new card!`;
  }
  if (showPlayerRank < showComputerRank && showComputerRank < 22) {
    return `Computer wins!<br><br>Player Hand: ${playerFirstCard} ${showPlayerHand} (Total Sum: ${showPlayerRank})<br>Computer Hand: ${computerFirstCard} ${showComputerHand} (Total Sum: ${showComputerRank})<br><br>Click submit to restart the game and draw a new card!`;
  }
  if (showPlayerRank > 21) {
    return `Player loses!<br><br>Player Hand: ${playerFirstCard} ${showPlayerHand} (Total Sum: ${showPlayerRank})<br>Computer Hand: ${computerFirstCard} ${showComputerHand} (Total Sum: ${showComputerRank})<br><br>Click submit to restart the game and draw a new card!`;
  }
  if (showComputerRank > 21) {
    return `Player wins!<br><br>Player Hand: ${playerFirstCard} ${showPlayerHand} (Total Sum: ${showPlayerRank})<br>Computer Hand: ${computerFirstCard} ${showComputerHand} (Total Sum: ${showComputerRank})<br><br>Click submit to restart the game and draw a new card!`;
  }
};

//------------------------------------------//
/////// RUN IF FUNCTION: HIT OR STAND ///////
//----------------------------------------//

var runPlayerChoice = function (input) {
  if (input == "hit") {
    var playerAddedCard = cards.pop();
    playerHand.push(playerAddedCard);
    console.log(`${playerHand[1].name} of ${playerHand[1].suit}`);

    var index = 1;
    while (index < playerHand.length) {
      playerAddedCard = `${playerHand[index].name} of ${playerHand[index].suit}`;
      playerFirstCard = `${playerHand[0].name} of ${playerHand[0].suit}`;
      showPlayerHand += playerAddedCard;
      //---------------------------------------------------------------//
      ////////// SOME PROBLEMS WITH MY CALCULATIONSSSSS!!!! ////////////
      //-------------------------------------------------------------//
      // addPlayerRank += parseInt(playerHand[index].value);
      // showPlayerRank = parseInt(playerHand[0].value) + parseInt(addPlayerRank);
      // console.log(showPlayerHand);
      // console.log(showPlayerRank);
      // console.log(addPlayerRank);

      if (showPlayerRank > 21 && showComputerRank < 21) {
        mode = "first card";
        return `Oh no you burst! Hit "Submit" button to try again!<br><br>Player Hand: ${playerFirstCard} ${showPlayerHand} (Total Sum: ${showPlayerRank})<br>Computer Hand: ${computerFirstCard} ${showComputerHand} (Total Sum: ${showComputerRank})`;
      }
      index += 1;
      return `You have chosen to "hit", and your additional card is ${playerAddedCard}. <br><br>Current Player Hand: ${playerFirstCard} ${showPlayerHand} (Total Sum: ${showPlayerRank})<br><br> Total number of card drawn by computer: ${computerHand.length}`;
    }
  } else if (input == "stand") {
    mode = "determine winner";
    return `You have chosen to "stand". Click the "Submit" button to see if you win!<br><br>Current Player Hand: ${playerFirstCard} ${showPlayerHand} (Total Sum: ${showPlayerRank})<br> Total number of card drawn by computer: ${computerHand.length}`;
  } else input != "hit" && input != "stand";
  return 'Pls key in only either "hit" or "stand" to proceed.';
};

//---------------------------------//
/////// CALCULATION FUNCTION ///////
//-------------------------------//

var calculateCards = function () {
  showPlayerRank = playerHand.reduce((sum, playerHand) => {
    return sum + playerHand.value;
  }, 0);
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
        value: rankCounter,
      };

      //-----------------------------------------------//
      /////// CHANGE VALUE OF PICTURE CARD TO 10 ///////
      //---------------------------------------------//

      if (
        cardName == "Ace" ||
        cardName == "Jack" ||
        cardName == "Queen" ||
        cardName == "King"
      ) {
        card.value = 10;
      }

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
