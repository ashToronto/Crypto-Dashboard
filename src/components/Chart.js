import React, {Component} from 'react';
import { Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData: {}
    }
  }

  getChartData = () => {
    // APICall here
    this.setState({
      chartData: {
        labels: ['Boston', 'Springfield', 'Lowell', 'New Bedford'],
        datasets:[
          {
            label:'Population',
            data:[
              40000,
              11000,
              12000,
              20000,
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
            ]
          }
        ]
      }
    });
  }

  componentWillMount(){
    this.getChartData();
  }

  render() {
    return(
    <div className="chart">
      CHART GOES HERE
      <Bar
        data={this.state.chartData}
        options={{
          maintainAspectRatio: false
        }}
        />
    </div>
    )
  }
}

export default Chart;
