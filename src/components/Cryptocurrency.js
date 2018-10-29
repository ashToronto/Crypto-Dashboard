import React, {Component} from 'react';
import {MdInsertChart, MdArrowDownward, MdArrowUpward} from 'react-icons/md';

class Cryptocurrency extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currencies: [],
      historical: []
    }
  }

  // Call to cryptocompare API for top 100 coins listed
  componentDidMount() {
    fetch(`https://api.coinmarketcap.com/v2/ticker/?convert=USD&limit=100&sort=rank&structure=array`).then(res => res.json()).then(result => {
      this.setState({currencies: result.data})
    });
  }

  historical_data = (e) => {
    e.preventDefault();
    const coin = e.target.elements.current_coin.value
    console.log("coin", coin)
    fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=USD`)
    .then(res => res.json())
    .then(result => {
      this.setState({historical: result.Data})
      console.log("historical data logged out: ", this.state.historical)
    });
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  render() {
    return (<div className='currency_list'>
      <h1>CryptoTrack</h1>
      <p>Most Popular Cryptocurrencies</p>
      <div className='wrapper'>
        {
          this.state.currencies.map((currency, i) => {
            return (<div className='box' key={i}>
              <img src={'https://s2.coinmarketcap.com/static/img/coins/16x16/' + currency.id + '.png'}/>
              <p>{currency.name}</p>
              <p>{currency.symbol}</p>
              <p>$ {Math.round(currency.quotes.USD.price * 100) / 100}</p>
              <span className="last24h_value">{
                  (currency.quotes.USD.percent_change_24h > 0)
                    ? <font color="#04d67b">
                        {currency.quotes.USD.percent_change_24h + '%'}
                        <MdArrowUpward/></font>
                    : <font color="#e50404">
                        {currency.quotes.USD.percent_change_24h + '%'}
                        <MdArrowDownward/></font>
                }
              </span>
              <form className="icon_position" onSubmit={this.historical_data}>
                <input type="hidden" name='current_coin' value={currency.symbol}/>
                <button className="chart_bttn"><MdInsertChart/></button>
              </form>
            </div>);
          })
        };
      </div>
    </div>);
  }
}
export default Cryptocurrency;
