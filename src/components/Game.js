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
                <Option id="1" answer={question.options[0].id} onClick={onClickMethod}>{question.options[0].name}</Option>
                <Option id="2" answer={question.options[1].id} onClick={onClickMethod}>{question.options[1].name}</Option>
                <Option id="3" answer={question.options[2].id} onClick={onClickMethod}>{question.options[2].name}</Option>
                <Option id="4" answer={question.options[3].id} onClick={onClickMethod}>{question.options[3].name}</Option>
                <div className="info"><strong>{question.type}</strong>: {question.content}</div>
                <div className="points">Score: {points}</div>
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