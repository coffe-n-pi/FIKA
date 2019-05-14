import React from 'react';
import panelFunc from './logic';
import PanelButton from './panel_button';

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
          <PanelButton name="Panel1" handleClick={panelFunc} number={1} />
          <div className="panel_content hide">
            THIS IS CONTENT FOR PANEL 1! blablabla
            blablablablablablablablablablablablabla
            blablablablablablablablablablablablabla
            blablablablablablablablablablablablabla
          </div>
        </div>

        <div>
          <PanelButton name="Panel2" handleClick={panelFunc} number={2} />
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
