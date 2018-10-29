import React, { Component } from 'react';
import Cryptocurrency from './components/Cryptocurrency';
import Chart from './components/Chart';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            WORKS
          </p>
          <Chart />
          <Cryptocurrency />
        </header>
      </div>
    );
  }
}

export default App;
