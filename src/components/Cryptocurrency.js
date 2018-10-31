import React, {Component} from 'react';
import {MdInsertChart, MdArrowDownward, MdArrowUpward} from 'react-icons/md';
import {Line} from 'react-chartjs-2';


class Cryptocurrency extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currencies: [],
      chartData: {},
      showChart: false
    }
  }

  // Call to cryptocompare API for top 100 coins listed
  componentDidMount() {
    fetch(`https://api.coinmarketcap.com/v2/ticker/?convert=USD&limit=100&sort=rank&structure=array`).then(res => res.json()).then(result => {
      console.log("RESULT DATA COINMARKETCAP HOME LIST: ", result.data)
      this.setState({currencies: result.data})
    });
  }

// Onclick show chart with specified currency
  historical_data = (e) => {
    e.preventDefault();
    const coin = e.target.elements.current_coin.value
    console.log("coin", coin)
    fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${coin}&tsym=USD`)
    .then(res => res.json())
    .then(result => {
      // local storage of currency values
      const xAxis_time = []
      const yAxis_closing_value = []
      const yAxis_high = []
      const yAxis_low = []
      result.Data.map(function(t){
        // convert to string date format
        const timeString = new Date(t.time * 1000).toLocaleDateString()
        xAxis_time.push(timeString)
        yAxis_closing_value.push(t.close)
        yAxis_high.push(t.high)
        yAxis_low.push(t.low)
      })
      // Create chart with coin data
      this.setState({
        showChart: true,
        chartData: {
          labels: xAxis_time,
          datasets: [
            {
              label: "close",
              data: yAxis_closing_value,
              borderColor: "#c45850",
              fill: false,
            },
            {
              label: "high",
              data: yAxis_high,
              borderColor: "blue",
              fill: false,
            },
            {
              label: "low",
              data: yAxis_low,
              borderColor: "yellow",
              fill: false,
            }
          ]
        }
      })
      console.log("SUMMARY data logged out: ", result)
    });
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  render() {
    return (<div className='currency_list'>
    {this.state.showChart ? (<Line data={this.state.chartData}/>) : (<p>SELECT A CURRENCY</p>)}
      <h3>CryptoTrack</h3>
      <p>Most Popular Cryptocurrencies</p>
      <div className='wrapper'>
        {
          this.state.currencies.map((currency, i) => {
            return (<div className='box' key={i}>
              <img alt="" src={'https://s2.coinmarketcap.com/static/img/coins/16x16/' + currency.id + '.png'}/>
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
