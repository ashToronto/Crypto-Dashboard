import React, { Component } from 'react';
import Cryptocurrency from './components/Cryptocurrency';
import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <div className="Layout">
          <Cryptocurrency />
        </div>
      </div>
    );
  }
}

export default App;
