import { useState } from 'react'

export default function Betting(props) {

const [yourBet, setYourBet] = useState("")
 const handleSubmit = (event) => {
   event.preventDefault()
    props.setPlayerInfo({...props.playerInfo, player1: {...props.playerInfo.player1, bet: Number(yourBet)}})
    props.setBetting(false)
 }

    return (
    <section className="betting">
        <h2>Betting</h2>
        <p>Make your bet for round 1 of 10</p>
        <form onSubmit={handleSubmit}>
            <label>How many hands do you think you'll win this round?</label>
            <input type="number" value={yourBet} onChange={(e) => setYourBet(e.target.value)}></input>
            <br/>
            <button type="submit">Make Bet</button>
        </form>
    </section>  
    )
}