import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WashingUp from './viewWashing'

class App extends Component {
  render() {
    return (
      <div className="App">
        <WashingUp />
        <div className='footer'>
          <div className='maxWidth'>
            <img className='irLogoFooter' src={require('./images/irFooter.png')}/>
            <a className='urllink'href="http://www.indigo-river.com">indigo-river.com</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
