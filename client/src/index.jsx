import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board.jsx';
import Title from './components/Title.jsx';
import styled from 'styled-components';
import { css } from 'styled-components';

const StyledApp = styled.div`
display:flex;
height: 100%;
text-align:center;
flex-direction: column;
padding: 100px;
font-size: 50px;
font-family:Tron;
`

const Victory1 = styled.div`
margin-top: 10px;
color: white;
${props => !props.player1Win && css`display: none`}
`

const Victory2 = styled.div`
margin-top: 10px;
color: white;
${props => !props.player2Win && css`display: none`}
`

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardSize: 35,
            board: [],
            gameOver: true,
            player: [],
            direction: '',
            player2: [],
            direction2: '',
            title: true,
            player1Win: false,
            player2Win: false
        }
        this.tick = this.tick.bind(this);
        this.login = this.login.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.restart = this.restart.bind(this);
    }

    restart() {
        this.renderBoard(this.state.boardSize);
        this.setState({
            gameOver: false,
            title: false,
            player1Win: false,
            player2Win: false,
            direction: '',
            direction2: ''
        })
        console.log(this.state)
    }

    componentDidMount() {
        this.renderBoard(this.state.boardSize)
    }

    login() {
        this.setState({title: false})
        this.setState({gameOver: false})
        document.addEventListener("keydown", this.handleKey.bind(this));
        setInterval(this.tick, 100)
    }

    playerPosition(player) {
        return player[0];
    }

    contains(player, cell) {
        let equals = true;
        for (var i = 0; i < player.length; i++) {
            player[i] === cell[i] ? null : equals = false;
        }
        return equals;
    }

    handleKey(e) {
        if(!this.state.title) {
            if (this.state.direction2 !== 'right') e.key === "a" ? this.setState({ direction2: 'left' }) : null;
            if (this.state.direction2 !== 'down') e.key === "w" ? this.setState({ direction2: 'up' }) : null;
            if (this.state.direction2 !== 'up') e.key === "s" ? this.setState({ direction2: 'down' }) : null;
            if (this.state.direction2 !== 'left') e.key === "d" ? this.setState({ direction2: 'right' }) : null;

            if (this.state.direction !== 'right') e.key === "ArrowLeft" ? this.setState({ direction: 'left' }) : null;
            if (this.state.direction !== 'down') e.key === "ArrowUp" ? this.setState({ direction: 'up' }) : null;
            if (this.state.direction !== 'up') e.key === "ArrowDown" ? this.setState({ direction: 'down' }) : null;
            if (this.state.direction !== 'left') e.key === "ArrowRight" ? this.setState({ direction: 'right' }) : null;
        }
    }

    step() {
        let playerChange = this.state.player.slice();
        if (this.state.direction === 'left') {
            let newPosition = [playerChange[0][0] - 1, playerChange[0][1]]
            playerChange.unshift(newPosition);
        }
        if (this.state.direction === 'up') {
            let newPosition = [playerChange[0][0], playerChange[0][1] - 1]
            playerChange.unshift(newPosition);
        }
        if (this.state.direction === 'down') {
            let newPosition = [playerChange[0][0], playerChange[0][1] + 1]
            playerChange.unshift(newPosition);
        }
        if (this.state.direction === 'right') {
            let newPosition = [playerChange[0][0] + 1, playerChange[0][1]]
            playerChange.unshift(newPosition);
        }
        let player2Change = this.state.player2.slice();
        if (this.state.direction2 === 'left') {
            let newPosition = [player2Change[0][0] - 1, player2Change[0][1]]
            player2Change.unshift(newPosition);
        }
        if (this.state.direction2 === 'up') {
            let newPosition = [player2Change[0][0], player2Change[0][1] - 1]
            player2Change.unshift(newPosition);
        }
        if (this.state.direction2 === 'down') {
            let newPosition = [player2Change[0][0], player2Change[0][1] + 1]
            player2Change.unshift(newPosition);
        }
        if (this.state.direction2 === 'right') {
            let newPosition = [player2Change[0][0] + 1, player2Change[0][1]]
            player2Change.unshift(newPosition);
        }
        this.setState({ 
            player: playerChange,
            player2: player2Change
        })     
    }

    outOfBounds(inputPlayer) {
        let player = this.playerPosition(this.state[inputPlayer])
        if (player[0] < 1 || player[0] > this.state.boardSize || player[1] < 1 || player[1] > this.state.boardSize) {
            this.setState({ gameOver: true });
            if(inputPlayer === 'player') {
                this.setState({ player1Win: true });
            } else {
                this.setState({ player2Win: true });
            }
        }
    }

    player1Victory() {
        this.state.player.slice(1).forEach(position => this.contains(position, this.playerPosition(this.state.player)) ? 
        this.setState({ 
            player1Win: true,
            gameOver: true
        }) : null)
        this.state.player.forEach(position => this.contains(position, this.playerPosition(this.state.player2)) ?
         this.setState({ 
             player1Win: true,
            gameOver: true
        }) : null)
    }

    player2Victory() {
        this.state.player2.slice(1).forEach(position => this.contains(position, this.playerPosition(this.state.player2)) ?
        this.setState({
            player2Win: true,
            gameOver: true
        }) : null)
        this.state.player2.forEach(position => this.contains(position, this.playerPosition(this.state.player)) ?
        this.setState({
            player2Win: true,
            gameOver: true
        }) : null)
    }
    
    tick() {
        this.player1Victory();
        this.player2Victory();
        this.outOfBounds('player')
        this.outOfBounds('player2')
        if (!this.state.gameOver) {
            this.step();
        }
    }

    renderBoard(n) {
        let rows = [];
        let height = 1;
        while (height <= n) {
            rows.push(height);
            height++;
        }
        this.setState({ board: rows });
        this.setState({ player: [[this.state.boardSize, this.state.boardSize]]});
        this.setState({ player2: [[1, this.state.boardSize]]});
    }



    render () {
        return (
            <StyledApp onKeyDown={this.handleKey}>
                <Title
                    title={this.state.title}
                    login={this.login}/>
                <Board
                    title={this.state.title}
                    board={this.state.board}
                    player={this.state.player}
                    player2={this.state.player2}
                    gameOver={this.state.gameOver}/>
                <Victory1 player1Win={this.state.player1Win}>
                    Player 1 Wins!
                    {/* <button onClick={this.restart}>clickme</button> */}
                </Victory1>
                <Victory2 player2Win={this.state.player2Win}>
                    Player 2 Wins!
                    {/* <button onClick={this.restart}>clickme</button> */}
                </Victory2>
            </StyledApp>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));