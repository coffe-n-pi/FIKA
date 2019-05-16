import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import SimpleLineChart from './SimpleLineChart';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
    dates: [],
    date: '2019/05/10',
  };

  componentDidMount() {
    axios.get('/api/getDates').then(res => {
      const { dates } = res.data;
      this.setState({ dates });
    });
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose(dropDownDate) {
    this.setState({ anchorEl: null, date: dropDownDate.replace(/-/g, '/') });
  }

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Show Dates
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.state.dates
            .slice(0)
            .reverse()
            .map(date => (
              <MenuItem value={date} onClick={() => this.handleClose(date)}>
                {date}
              </MenuItem>
            ))}
        </Menu>
        <SimpleLineChart date={this.state.date} />
      </div>
    );
  }
}

export default SimpleMenu;
