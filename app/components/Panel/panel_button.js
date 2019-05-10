import React from 'react';
import PropTypes from 'prop-types';

export default function PanelButton({ name, handleClick, number }) {
  return (
    <button
      className="panel_drop_down"
      type="button"
      onClick={() => handleClick(number)}
    >
      {name}
    </button>
  );
}
PanelButton.propTypes = {
  name: PropTypes.string,
  handleClick: PropTypes.func,
  number: PropTypes.number,
};
