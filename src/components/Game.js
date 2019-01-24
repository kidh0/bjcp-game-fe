import React from 'react';
import Option from './Option';
import loader from '../loader.svg';

class Game extends React.Component {

    render() {
        const question = this.props.data
        const points = this.props.points
        const loading = this.props.loading
        const onClickMethod = this.props.onClick
        return (
            <div className="wrapper">
                {question.options.map(option => (                     
                    <Option 
                        answer={option.id} onClick={onClickMethod}>{option.name}</Option>    
                ))}
                <div className="info"><strong>{question.type}</strong>: {question.content}</div>
                <div className="score">Score: {points}</div>
                {loading &&
                    <div className="loader">
                        <img src={loader} alt="loader" />
                    </div>
                }
            </div>
        )
    }
}

export default Game;