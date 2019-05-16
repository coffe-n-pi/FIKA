import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
    dates: [],
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
    this.setState({ anchorEl: null });

    const dropDownDateJSON = JSON.stringify(dropDownDate);
    const dropDownDateBtoa = btoa(dropDownDateJSON);
    localStorage.setItem('_dropDownDate', dropDownDateBtoa);
    console.log(`handleClose printout: ${dropDownDateBtoa}`);
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
      </div>
    );
  }
}

export default SimpleMenu;
