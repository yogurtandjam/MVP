import React from 'react';
import Row from './Row.jsx';
import styled from 'styled-components';

const Display = styled.div`
    display:${props => props.title ? 'none' : 'flex'};
    position: relative;
    flex-direction: column;
`

const Styledboard = styled.div`
    display:inline-flex;
    flex-direction: row;
    margin: auto;
    border: solid;
`

const Boarder = styled.div`
    margin: auto;
    
    box-shadow: 0 0 10px 10px #00FFFF;
`

const Header = styled.h1`
    font-size: 80px
    background: -webkit-linear-gradient(#eee, #00FFFF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

class Board extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <Display title={this.props.title}>
                <Header>
                    Crohn: Legacy
                </Header>
                <Boarder>
                    <Styledboard>
                        {this.props.board.map(x => <Row
                            row={this.props.board}
                            x={x}
                            player={this.props.player}
                            player2={this.props.player2}
                            gameOver={this.props.gameOver}
                            />)}
                    </Styledboard>
                </Boarder>
            </Display>
        )
    }
}

export default Board;