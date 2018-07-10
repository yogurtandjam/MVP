import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

const StyledCell = styled.div`
    background-color: black;
    width:10px;
    height:10px;
    ${props => props.isPlayer && css`background-color:red` }
    ${props => props.isTraveled && css`background-color:pink` }
    ${props => props.isPlayer2 && css`background-color:#00FFFF`}
    ${props => props.isTraveled2 && css`background-color:skyblue` }

    ${props => props.isPlayer && css`border-radius: 3px` }
    ${props => props.isTraveled && css`border-radius:0` }
    ${props => props.isPlayer2 && css`border-radius: 3px`}
    ${props => props.isTraveled2 && css`border-radius:0` }
    
`

class Cell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isTraveled: false,
            isTraveled2: false,
            isPlayer: false,
            isPlayer2: false
        }
        this.isCellPlayer = this.isCellPlayer.bind(this);
        this.playerPosition = this.playerPosition.bind(this);
        this.contains = this.contains.bind(this);
        this.currentPosition = this.currentPosition.bind(this);
    }

    componentDidMount() {
        this.isCellPlayer();
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.player !== this.props.player) {
            this.isCellPlayer();
        }

        if (prevProps.restart !== this.props.restart) {
            this.setState({
                isTraveled: false,
                isTraveled2: false,
                isPlayer: false,
                isPlayer2: false
            })
        }
    }
    
    playerPosition() {
        return this.props.player[0]
    }
    
    player2Position() {
        return this.props.player2[0]
    }
    
    currentPosition() {
        return [this.props.x, this.props.y];
    }
    
    contains(player, cell) {
        let equals = true;
        for (var i = 0; i < player.length; i++) {
            player[i] === cell[i] ? null : equals = false;
        }
        return equals;
    }
    
    isCellPlayer(){
        if (this.contains(this.playerPosition(), this.currentPosition()) && !this.state.isPlayer) {
            this.setState({ isPlayer: true })
        }
        if (!this.contains(this.playerPosition(), this.currentPosition()) && this.state.isPlayer) {
            this.setState({ isTraveled: true })
        }
        if (this.contains(this.player2Position(), this.currentPosition()) && !this.state.isPlayer2) {
            this.setState({ isPlayer2: true })
        }
        if (!this.contains(this.player2Position(), this.currentPosition()) && this.state.isPlayer2) {
            this.setState({ isTraveled2: true })
        }
    }

    render () {
        return (
            <StyledCell
                gameOver={this.props.gameOver}
                isTraveled={this.state.isTraveled}
                isTraveled2={this.state.isTraveled2}
                isPlayer={this.state.isPlayer}
                isPlayer2={this.state.isPlayer2}
                restart={this.props.restart}>
            </StyledCell>
        )
    }
}

export default Cell;