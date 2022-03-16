import Betting from './Betting'

export default function SideBar(props) {

    const handleNewGame = () => {
        props.setGameInPlay(true)
        props.setNewRound(true)
    }
    
    return (
    <div className='sidebar'>
        <section className="options">
        <ul>
            <li onClick={handleNewGame}>New Game</li>
            <li>Rules</li>
        </ul>
        </section>
        
        <section className="score">
        <h2>Round: <span>{props.round}</span> of 10</h2>
        <h2>Current Trump Suit: <span>{props.suit}</span></h2>
        <h2>Score:</h2>
        <div className="score-table">
            <div>You</div>
            <div>{props.playerInfo.player1.score}</div>
            <div>Player 2</div>
            <div>{props.playerInfo.player2.score}</div>
            <div>Player 3</div>
            <div>{props.playerInfo.player3.score}</div>
            <div>Player 4</div>
            <div>{props.playerInfo.player4.score}</div>
            </div>
        </section>
        {props.betting && <Betting playerInfo={props.playerInfo} setPlayerInfo={props.setPlayerInfo} setBetting={props.setBetting}/>}
    </div>
    )
}