import React, { Component } from 'react';
import Cryptocurrency from './components/Cryptocurrency';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Cryptocurrency />
        </header>
      </div>
    );
  }
}

export default App;
