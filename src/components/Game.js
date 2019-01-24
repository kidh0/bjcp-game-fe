import React from 'react';
import Option from './Option';
import loader from '../loader.svg';

const Game = (props) => {
    const question = props.data
    const points = props.points
    const loading = props.loading
    const onClickMethod = props.onClick
    return (
        <div className="wrapper">
            {question.options.map((option,key) => (                     
                <Option
                    key={key} 
                    answer={option.id} 
                    onClick={onClickMethod}
                >
                    {option.name}
                </Option>    
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

export default Game;