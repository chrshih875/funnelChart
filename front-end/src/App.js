import React from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        chart: {
          type: 'bar',
          height: 440,
          stacked: true
        },
        colors: ['#008FFB', '#FF4560'],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '80%',
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        yaxis: {
          min: -5,
          max: 5,
          title: {
            text: 'Years'},
        },
        title: {
          text: 'American Population split by age and gender'
        },
        xaxis: {
          categories: ['85+', '80-84', '75-79', '70-74', '65-69', '60-64', '55-59', '50-54',
            '45-49', '40-44', '35-39', '30-34', '25-29', '20-24', '15-19', '10-14', '5-9',
            '0-4'
          ],
          title: {
            text: 'Percent'
          },
        },
      },
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/population/')
      .then(response => {
        const series = [
          {
              name: 'Males',
              data: response.data.map(entry => parseFloat(entry.Male))
          },
          {
              name: 'Females',
              data: response.data.map(entry => parseFloat(entry.Female))
          }
      ];
        this.setState({ series });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={440} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;