import React, { Component } from 'react';

class Cryptocurrency extends Component {
  constructor(props){
    super(props)
    this.state = {currencies: []}
  }

    // Call to cryptocompare API for top 100 coins listed
    componentDidMount() {
      fetch(`https://api.coinmarketcap.com/v2/ticker/?convert=USD&limit=100&sort=rank&structure=array`)
      .then(res => res.json())
      .then(result => {
        this.setState({currencies: result.data})
      });
    }

    render(){
      return (
        <div>
          Hello World
          <table>
            {this.state.currencies.map((currency, i) => {
              return (
                <tr>
                  <p>{currency.name}</p>
                  <p>{currency.quotes.USD.price}</p>
                </tr>
                );
            })};
            </table>
        </div>
      );
    }
}
export default Cryptocurrency;
