import { useState, useEffect } from 'react'
const {cardData, suitOrder } = require('./CardData')

export default function Table(props) {
const newHand = {
  player1: "",
  player2: "",
  player3: "",
  player4: ""
}
const [dealer, setDealer] = useState("player1")
 const [playerTurn, setPlayerTurn] = useState("player1")
 const [playedCards, setPlayedCards] = useState(newHand)


 useEffect(() => {
  computerTurn(playerTurn)
 }, [playerTurn])


 const winningHandLogic = () => {
  const cardsArray = [playedCards.player1, playedCards.player2, playedCards.player3, playedCards.player4]
  const trumpWinningHand = cardsArray.filter(card => card.suit === props.suit)
  const normalWinningHand = cardsArray.filter(card => playedCards[dealer].suit === card.suit)
  let winningCard = {}
  

  if(trumpWinningHand.length > 0) {
    trumpWinningHand.sort((a,b) => cardData[b.code] - cardData[a.code])
    winningCard = trumpWinningHand[0]
  }
  else {
    normalWinningHand.sort((a,b) => cardData[b.code] - cardData[a.code])
    winningCard = normalWinningHand[0]
  }

  let player = ""

  if(cardsArray.indexOf(winningCard) === 0) player = "player1"
  if(cardsArray.indexOf(winningCard) === 1) player = "player2"
  if(cardsArray.indexOf(winningCard) === 2) player = "player3"
  if(cardsArray.indexOf(winningCard) === 3) player = "player4"

  const alreadyWon = (player === dealer)

  props.setPlayerInfo({...props.playerInfo, [player]: {...props.playerInfo[player], handsWon: props.playerInfo[player].handsWon + 1}})

setTimeout(() => {
  setPlayedCards(newHand)
  setDealer(player)
  if(alreadyWon) {setPlayerTurn("wait")}
  else {setPlayerTurn(player)}
}, 1500)
 
 }

 const cardPlay = (player, index) => {
  const newCards = props.playerInfo[player].cards.filter(card => props.playerInfo[player].cards.indexOf(card) !== index)
  const cardPlayed = props.playerInfo[player].cards.splice(index,1)[0]
  setPlayedCards({...playedCards, [player]: cardPlayed})
  props.setPlayerInfo({...props.playerInfo, [player]: {...props.playerInfo[player], cards: newCards}})
}


 const computerPlayedCard = (player) => {
  let number = props.playerInfo[player].cards.findIndex(card => card.suit === playedCards[dealer].suit)
  if(number === -1) number = props.playerInfo[player].cards.findIndex(card => card.suit === props.suit)
  if(number === -1) number = Math.floor(Math.random() * props.playerInfo[player].cards.length)

  return number
 }


 const computerTurn = (player) => {
   if(player === "wait") {
    setPlayerTurn(dealer) 
    return
   }
   if(playedCards[player]) {
     winningHandLogic()
   }
   else if(props.playerInfo.player1.cards.length === 0 &&
    props.playerInfo.player2.cards.length === 0 &&
    props.playerInfo.player3.cards.length === 0 &&
    props.playerInfo.player4.cards.length === 0 && props.game) {endOfRoundLogic()}
   else if(playerTurn !== "player1") {
  const indexOfPlayedCard = computerPlayedCard(player)
  cardPlay(player, indexOfPlayedCard)
  changeTurn()
   } 
 }


 const changeTurn = () => {
   if(playerTurn === "player1") setPlayerTurn("player2")
   else if(playerTurn === "player2") setPlayerTurn("player3")
   else if(playerTurn === "player3") setPlayerTurn("player4")
   else if(playerTurn === "player4") setPlayerTurn("player1")
}


  const handlePlay = (key) => { 
    if(playedCards.player1) {
      winningHandLogic()
    }
    //add logic here to make player follow suit
    else if(!props.betting) {
      cardPlay("player1", key)
      changeTurn()
    }
}

  const endOfRoundLogic = () => {
    if(props.round === 10) {
      console.log("End of Game")
      return
    }
    endOfRoundScores()
    //set timeout here maybe
    props.setRound(props.round + 1)
    props.setNewRound(true)
    //need to sort out suits logic
    props.setSuit(suitOrder[props.round])
    props.setNumberOfCards(props.numberOfCards - 1)
    setPlayerTurn("player1")
  }

  const endOfRoundScores = () => {

    const makeScore = (player) => {
      let roundScore = props.playerInfo[player].handsWon
      if(props.playerInfo[player].bet === props.playerInfo[player].handsWon) {
        roundScore+=5
      }
      return roundScore
    }
    props.setPlayerInfo( {
      player1: {...props.playerInfo.player1, score: props.playerInfo.player1.score + makeScore("player1")},
      player2: {...props.playerInfo.player2, score: props.playerInfo.player2.score + makeScore("player2")},
      player3: {...props.playerInfo.player3, score: props.playerInfo.player3.score + makeScore("player3")},
      player4: {...props.playerInfo.player4, score: props.playerInfo.player4.score + makeScore("player4")},
    })
  }

  return (
    <div className='table'>
      <div className='player3'>
        <div className='score-grid'>
          <div className='player'>Player 3</div>
          <div className='betted'>Betted</div>
          <div className='hands'>Hands</div>
          <div className='betted-value'>{props.playerInfo.player3.bet}</div>
          <div className='hands-value'>{props.playerInfo.player3.handsWon}</div>
        </div>
        <div className='player3-cards'>
          <img src='https://blog.betvictor.com/campaigns/the-art-of-playing-cards/assets/img/og_card_5@2x.png' alt="Playing Card Back"/>
        </div>
      </div>
      <div className='player2'>
        <div className='score-grid'>
          <div className='player'>Player 2</div>
          <div className='betted'>Betted</div>
          <div className='hands'>Hands</div>
          <div className='betted-value'>{props.playerInfo.player2.bet}</div>
          <div className='hands-value'>{props.playerInfo.player2.handsWon}</div>
        </div>
        <div className='player2-cards'>
          <img src='https://blog.betvictor.com/campaigns/the-art-of-playing-cards/assets/img/og_card_5@2x.png' alt="Playing Card Back"/>
        </div>
      </div>
      <div className='play-area'>
        <div className='player1-played played-card'>{playedCards.player1 && <img src={playedCards.player1.image} alt="Played Card Player 1" />}</div>
        <div className='player2-played played-card'>{playedCards.player2 && <img src={playedCards.player2.image} alt="Played Card Player 2" />}</div>
        <div className='player3-played played-card'>{playedCards.player3 && <img src={playedCards.player3.image} alt="Played Card Player 3" />}</div>
        <div className='player4-played played-card'>{playedCards.player4 && <img src={playedCards.player4.image} alt="Played Card Player 4" />}</div>
      </div>
      <div className='player4'>
        <div className='score-grid'>
          <div className='player'>Player 4</div>
          <div className='betted'>Betted</div>
          <div className='hands'>Hands</div>
          <div className='betted-value'>{props.playerInfo.player4.bet}</div>
          <div className='hands-value'>{props.playerInfo.player4.handsWon}</div>
        </div>
        <div className='player4-cards'>
          <img src='https://blog.betvictor.com/campaigns/the-art-of-playing-cards/assets/img/og_card_5@2x.png' alt="Playing Card Back"/>
        </div>
      </div>
      <div className='player1'>
        <div className='score-grid'>
          <div className='player'>You</div>
          <div className='betted'>Betted</div>
          <div className='hands'>Hands</div>
          <div className='betted-value'>{props.playerInfo.player1.bet}</div>
          <div className='hands-value'>{props.playerInfo.player1.handsWon}</div>
        </div>
        <div className='player1-cards'>
          {props.playerInfo.player1.cards.map((card, index) => (
            <img key={index} src={`${card.image}`} onClick={() => handlePlay(index, card.image)}/>
          ))}
        </div>
      </div>
    </div>
  );
}