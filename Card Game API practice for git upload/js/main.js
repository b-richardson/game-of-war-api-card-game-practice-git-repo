//Get the deck
let deckId = ''
// Fetch API Goes Here

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

localStorage.setItem('deckId', deckId)

// Draw Cards Button
document.querySelector('button').addEventListener('click', getFetch)



// This Function Draws 2 cards to play war
function getFetch(){
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        let val1 = Number(cardValue(data.cards[0].value))
        let val2 = Number(cardValue(data.cards[1].value))
        document.querySelector('#player1').src = data.cards[0].image
        document.querySelector('#player2').src = data.cards[1].image
        if(val1 > val2){
          document.querySelector('h3').innerText = 'Player 1 WON!'
        }else if(val1 < val2){
            document.querySelector('h3').innerText = 'Player 2 WON!'
          }else{
            document.querySelector('h3').innerText = 'W A R'
          }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


// Function that establishes value of two cards drawn
function cardValue(val){
  if (val === 'ACE'){
    return 14
  }else if (val === 'KING'){
    return 13
  }else if (val === 'QUEEN'){
    return 12
  }else if (val === 'JACK'){
    return 11
  }else{ 
    return (val)
  }
}
