import './App.css';
import { useState, useEffect } from 'react'
import SideBar from './SideBar'
import Table from './Table'

const {cardData, cardsAddBetting } = require('./CardData')

function App() {
  const [gameInPlay, setGameInPlay] = useState(false)
  const [newRound, setNewRound] = useState(false)
  const [deckID, setDeckID] = useState("")
  const [cardsToDeal, setCardsToDeal] = useState([])
  const [round, setRound] = useState(1)
  const [numberOfCards, setNumberOfCards] = useState(10)
  const [suit, setSuit] = useState("CLUBS")
  const [betting, setBetting] = useState(false)

  const [playerInfo, setPlayerInfo] = useState({
    player1: {cards: [], bet: 0, handsWon: 0, score: 0},
    player2: {cards: [], bet: 0, handsWon: 0, score: 0},
    player3: {cards: [], bet: 0, handsWon: 0, score: 0},
    player4: {cards: [], bet: 0, handsWon: 0, score: 0},
  })

   useEffect(() => {
    if(newRound) {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => response.json())
    .then(res => {
      setNewRound(false)
      setDeckID(res.deck_id)
    })
  }}, [newRound])

  useEffect(() => {
    if(deckID) {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=${numberOfCards*4}`)
    .then(response => response.json())
    .then(res => {
      setCardsToDeal(res.cards)
    })
  }
  }, [deckID])

  useEffect(() => {
    if(cardsToDeal.length !== 0) {

    let playerOne = []
    let playerTwo = []
    let playerThree = []
    let playerFour = []

    for(let i = 0; i < numberOfCards; i++ ) {
      playerOne.push(cardsToDeal[i])
    } 
    for(let i = numberOfCards; i < numberOfCards*2; i++ ) {
      playerTwo.push(cardsToDeal[i])
    } 
    for(let i = numberOfCards*2; i < numberOfCards*3; i++ ) {
      playerThree.push(cardsToDeal[i])
    } 
    for(let i = numberOfCards*3; i < numberOfCards*4; i++ ) {
      playerFour.push(cardsToDeal[i])
    } 

    playerOne.sort((a,b) => cardData[a.code] - cardData[b.code])

    let numberToBet2 = 0
    for(const card of playerTwo) {
      if(cardsAddBetting.includes(card.code)) {
        numberToBet2++
      }
    }

    let numberToBet3 = 0
    for(const card of playerThree) {
      if(cardsAddBetting.includes(card.code)) {
        numberToBet3++
      }
    }

    let numberToBet4 = 0
    for(const card of playerFour) {
      if(cardsAddBetting.includes(card.code)) {
        numberToBet4++
      }
    }

    setBetting(true)

    setPlayerInfo( {
      player1: {cards: playerOne, bet: 0, handsWon: 0, score: playerInfo.player1.score},
      player2: {cards: playerTwo, bet: numberToBet2, handsWon: 0, score: playerInfo.player2.score},
      player3: {cards: playerThree, bet: numberToBet3, handsWon: 0, score: playerInfo.player3.score},
      player4: {cards: playerFour, bet: numberToBet4, handsWon: 0, score: playerInfo.player4.score},
    })
  
    }
  }, [cardsToDeal])



  return (
    <div className="App">
      <SideBar 
        suit={suit}
        round={round}
        setNewRound={setNewRound}
        betting={betting}
        setBetting={setBetting}
        playerInfo={playerInfo}
        setPlayerInfo={setPlayerInfo}
        setGameInPlay={setGameInPlay}
        />
      <Table 
        numberOfCards={numberOfCards}
        setNumberOfCards={setNumberOfCards}
        round={round}
        setNewRound={setNewRound}
        setRound={setRound}
        game={gameInPlay}
        suit={suit}
        setSuit={setSuit}
        betting={betting}
        playerInfo={playerInfo}
        setPlayerInfo={setPlayerInfo}/>
    </div>
  );
}

export default App;
