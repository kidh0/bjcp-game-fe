import React, { Component } from 'react';
import Intro from './components/Intro';
import Game from './components/Game';
import axios from "axios";

import './App.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { registerDecorator } from 'handlebars';

class App extends Component {
  state = { 
    showGame: false, 
    points: 0, 
    loading: false 
  }    

  componentDidMount() {
    this.loadRemoteData();
  }

  loadRemoteData() {
    this.setState({loading: true})
    axios.get('https://bjcp-game-be.herokuapp.com/next').then(res => {
      this.setState({ data: res.data });
      this.setState({ loading: false });
    });
  }

  handleAnswerClick = answer => {
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

  handleShowGameClick = () => {    
    this.setState({showGame: true})
  }

  renderContent = () => {
    if (this.state.showGame) {
      const { loading, points, data } = this.state; 
      return (
        <Game
          onClick={this.handleAnswerClick}
          loading={loading}
          points={points}
          data={data}
        />
      );
    } else {
      return (
        <Intro onClick={this.handleShowGameClick} />
      );
    }
  }

  render() {
    return (
      <div className="wrapper">
        {this.renderContent()}
        <NotificationContainer/>
      </div>
    );
  }
}

export default App;
