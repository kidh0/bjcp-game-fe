import React, { Component } from 'react';
import bjcp from './bjcp.png';
import loader from './loader.svg';
import './App.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

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
  const loading = props.loading
  return (
    <div className="wrapper">
      <Option id="1" answer={question.options[0].id} onClick={props.onClick}>{question.options[0].name}</Option>
      <Option id="2" answer={question.options[1].id} onClick={props.onClick}>{question.options[1].name}</Option>
      <Option id="3" answer={question.options[2].id} onClick={props.onClick}>{question.options[2].name}</Option>
      <Option id="4" answer={question.options[3].id} onClick={props.onClick}>{question.options[3].name}</Option>
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

class App extends Component {
  
  constructor(props) {
    super(props);
    this.handleShowGameClick = this.handleShowGameClick.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.state = { showGame: false, points: 0, loading: false }    
  }

  componentDidMount() {
    this.loadRemoteData();
  }

  loadRemoteData() {
    this.setState({loading: true})
    fetch('https://bjcp-game-be.herokuapp.com/next')
      .then(response => response.json())
      .then(data => this.setState({ data: data }))
      .then(() => this.setState({loading: false}));
  }

  handleAnswerClick(answer) {
    const actualPoints = this.state.points;
    let points = 0;
    if(answer === this.state.data.answer) {
      NotificationManager.success('+1 points', 'You got it!',2000);
      points = actualPoints+1;
    } else {
      NotificationManager.error('-1 points', 'You miss it!',2000);
      points = actualPoints > 0 ? actualPoints-1 : 0;
    }
    this.setState({ points: points })
    this.loadRemoteData();
  }

  handleShowGameClick() {    
    this.setState({showGame: true})
  }

  render() {
    const showGame = this.state.showGame;
    let content;

    if (showGame) {
      content = <Game onClick={this.handleAnswerClick} loading={this.state.loading} points={this.state.points} data={this.state.data} />
    } else {
      content = <Intro onClick={this.handleShowGameClick} />
    }

    return (
      <div className="wrapper">
        {content}
        <NotificationContainer/>
      </div>
    );
  }
}

export default App;
