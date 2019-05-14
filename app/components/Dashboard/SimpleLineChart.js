import React, { Component } from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import moment from 'moment';
import dbD from './output';
import SimpleMenu from './SimpleMenu';

class SimpleLineChart extends Component {
  constructor(props) {
    super(props);
    this.data = dbD;
  }

  formatXAxis(tickItem) {
    // If using moment.js
    // console.log(tickItem);
    return moment(tickItem).format('HH:mm:s');
  }

  render() {
    return (
      <div>
        <SimpleMenu />
        <ResponsiveContainer width="99%" height={320}>
          <LineChart data={this.data}>
            <XAxis dataKey="timestamp" tickFormatter={this.formatXAxis} />
            <YAxis />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="data.person" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default SimpleLineChart;
