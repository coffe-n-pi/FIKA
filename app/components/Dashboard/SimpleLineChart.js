import React, { Component } from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import AreaChart from 'recharts/lib/chart/AreaChart';
import Area from 'recharts/lib/cartesian/Area';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import * as d3fc from '@d3fc/d3fc-sample';
import SimpleMenu from './SimpleMenu';

class SimpleLineChart extends Component {
  state = {
    flow_data: [],
  };

  static propTypes = {
    date: PropTypes.any,
  };

  loadData() {
    let dropDownDate = localStorage.getItem('_dropDownDate');
    if (!dropDownDate) return false;

    localStorage.removeItem('_dropDownDate');
    dropDownDate = atob(dropDownDate);
    dropDownDate = JSON.parse(dropDownDate);

    // do something with the data here. Date located in var 'dropDownDate'

    return true;
  }

  formatXAxis(tickItem) {
    // If using moment.js
    return moment(tickItem).format('HH:mm');
  }

  componentDidMount() {
    console.log(this.props.date);
    axios.get(`api/GetDate/${this.props.date}`).then(res => {
      console.log(res.data);
      const data = res.data.rows;
      const sampler = d3fc.largestTriangleThreeBucket();
      sampler
        .x(d => moment(d.key).format('X'))
        .y(d => (d.value.person ? d.value.person : 0));

      sampler.bucketSize(100);
      this.setState({ flow_data: sampler(data) });
    });
  }

  render() {
    return (
      <div>
        <SimpleMenu />
        <ResponsiveContainer width="99%" height={320}>
          <AreaChart
            width={730}
            height={250}
            data={this.state.flow_data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="key" tickFormatter={this.formatXAxis} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value.person"
              dotstroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
              dot
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default SimpleLineChart;
