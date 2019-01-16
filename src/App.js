import React, { Component } from 'react';
import bjcp from './bjcp.png';
import loader from './loader.svg';
import './App.css';

function Intro(props) {
  return (
    <div className="intro">
      <h1>BJCP Game</h1>
      <figure>
        <img src={bjcp} alt="BJCP Logo" />
      </figure>
      <p>
        This is a game to exercise BJCP judge knowledge through a simple multi answer quiz
        <button className="btn" onClick={props.onClick} >Let's do it!</button>
      </p>
      <small className="foot-note">This game is no affiliated with BJCP</small>
    </div>  
  );
}

function Game() {
  return (
    <div className="wrapper">
      <div className="options" id="option-1"></div>
      <div className="options" id="option-2"></div>
      <div className="options" id="option-3"></div>
      <div className="options" id="option-4"></div>
      <div className="info"></div>
      <div className="points">0</div>
      <div className="loader">
        <img src={loader} alt="loader" />
      </div>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleShowGameClick = this.handleShowGameClick.bind(this);
    this.state = { showGame: false };
  }

  handleShowGameClick() {
    this.setState({showGame: true})
  }

  render() {
    const showGame = this.state.showGame;
    let content;

    if (showGame) {
      content = <Game />
    } else {
      content = <Intro onClick={this.handleShowGameClick} />
    }

    return (
      <div className="wrapper">
        {content}
      </div>
    );
  }
}

export default App;
