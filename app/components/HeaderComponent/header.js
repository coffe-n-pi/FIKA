import React from 'react';
import './header.css';
const daftImg = require('./../../images/daft2.png');
export default function Header() {
  return (
    <div>
      <img className="logo" src={daftImg} alt="DAFT logo" />
      <button className="logout" type="submit">
        Logout
      </button>
    </div>
  );
}
