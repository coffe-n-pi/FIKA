import React from 'react';
import './panel.css';
import panelFunc from './logic';
export default function Panel() {
  return (
    <div className="panel_area">
      <div>
        <button className="user_button" type="submit">
          USER NAME
        </button>
      </div>
      <div className="main_panel">
        <div>
          <button
            className="panel_drop_down"
            type="button"
            onClick={() => panelFunc('1')}
          >
            Panel1
          </button>
          <div className="panel_content hide">
            THIS IS CONTENT FOR PANEL 1! blablabla
            blablablablablablablablablablablablabla
            blablablablablablablablablablablablabla
            blablablablablablablablablablablablabla
          </div>
        </div>

        <div>
          <button
            className="panel_drop_down"
            type="button"
            onClick={() => panelFunc('2')}
          >
            Panel2
          </button>
          <div className="panel_content hide">
            THIS IS CONTENT FOR PANEL 2! blablabla
            blablablablablablablablablablablablabla
            blablablablablablablablablablablablabla
            blablablablablablablablablablablablabla
          </div>
        </div>
      </div>
    </div>
  );
}
