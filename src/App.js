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

function Option({id, answer, onClick, ...rest }) {
  return (
    <div onClick={() => onClick(answer)} className="options" id={`option-${id}`} {...rest} />
  )
}

function Game(props) {
  const question = props.data
  const points = props.points
  return (
    <div className="wrapper">
      <Option id="1" answer={question.options[0].id} onClick={props.onClick}>{question.options[0].name}</Option>
      <Option id="2" answer={question.options[1].id} onClick={props.onClick}>{question.options[1].name}</Option>
      <Option id="3" answer={question.options[2].id} onClick={props.onClick}>{question.options[2].name}</Option>
      <Option id="4" answer={question.options[3].id} onClick={props.onClick}>{question.options[3].name}</Option>
      <div className="info">{question.type} : {question.content}</div>
      <div className="points">Points: {points}</div>
      {/* <div className="loader">
        <img src={loader} alt="loader" />
      </div> */}
    </div>
  )
}

class App extends Component {
  
  constructor(props) {
    super(props);
    this.handleShowGameClick = this.handleShowGameClick.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.state = { showGame: false, points: 0 }
  }

  componentDidMount() {
    this.loadRemoteData();
  }

  loadRemoteData() {
    fetch('https://bjcp-game-be.herokuapp.com/next')
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }

  handleAnswerClick(answer) {
    const points = this.state.points;
    if(answer == this.state.data.answer) {
      this.setState({points: points+1})
    }
    this.loadRemoteData();
  }

  handleShowGameClick() {
    this.setState({showGame: true})
  }

  render() {
    const showGame = this.state.showGame;
    let content;

    if (showGame) {
      content = <Game onClick={this.handleAnswerClick} points={this.state.points} data={this.state.data} />
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
