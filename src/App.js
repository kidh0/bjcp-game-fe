import React, { Component } from 'react';
import Intro from './components/Intro';
import Game from './components/Game';

import './App.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

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
