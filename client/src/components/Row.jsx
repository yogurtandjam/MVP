import React from 'react';
import Cell from './Cell.jsx';
import styled from 'styled-components';

const StyledRow = styled.div`
    flex-direction:row;
`

class Row extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
            <StyledRow>
                {this.props.row.map(y => <Cell
                    board={this.props.row}
                    x={this.props.x}
                    y={y}
                    player={this.props.player}
                    player2={this.props.player2}
                    gameOver={this.props.gameOver}
                    />)}
            </StyledRow>
        )
    }
}

export default Row;