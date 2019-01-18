import React from 'react';
import bjcp from '../bjcp.png';

class Intro extends React.Component {

    render() {
        return (
            <div className="intro">
                <h1>BJCP Game</h1>
                <figure>
                    <img src={bjcp} alt="BJCP Logo" />
                </figure>
                <p>
                    This is a game to exercise BJCP judge knowledge through a simple multi answer quiz
            <button className="btn" onClick={this.props.onClick} >Let's do it!</button>
                </p>
                <small className="foot-note">This game is no affiliated with BJCP</small>
            </div>
        );
    }
}

export default Intro;