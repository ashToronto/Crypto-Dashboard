import React, { Component } from 'react';
import Cryptocurrency from './components/Cryptocurrency';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            WORKS
          </p>
          <Cryptocurrency />
        </header>
      </div>
    );
  }
}

export default App;
