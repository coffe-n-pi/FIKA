import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class BarChart extends Component {
  static propTypes = {
    id: PropTypes.any,
  };

  constructor() {
    super();
    this.textarea = React.createRef();
  }

  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(`#${this.props.id}`)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    // Read the data
    d3.csv(
      'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv',
      d => ({ date: d3.timeParse('%Y-%m-%d')(d.date), value: d.value }),
    ).then(
      // Now I can use this dataset:
      data => {
        // Add X axis --> it is a date format
        const x = d3
          .scaleTime()
          .domain(d3.extent(data, d => d.date))
          .range([0, width]);

        svg
          .append('g')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(x));
        // Add Y axis
        const y = d3
          .scaleLinear()
          .domain([0, d3.max(data, d => +d.value)])
          .range([height, 0]);
        svg.append('g').call(d3.axisLeft(y));
        // Add the line
        svg
          .append('path')
          .datum(data)
          .attr('fill', 'none')
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 1.5)
          .attr(
            'd',
            d3
              .line()
              .x(d => x(d.date))
              .y(d => y(d.value)),
          );
      },
    );
  }

  render() {
    return <svg id={this.props.id} />;
  }
}

export default BarChart;
