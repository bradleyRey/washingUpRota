import React, { Component } from 'react';

import NamesApi from './api/names'
import './App.css'


class WashingUp extends Component{
  constructor(props){
    super(props);
    this.state = {
      names: ''
    }
  }

  componentWillMount(){

    NamesApi.getNames(names => {
      console.log(names.data)
      this.setState({
        names: names.data
      },function(){
        console.log(names)
      })
    })
  }
  render(){

    console.log('helooo')

    return(
      <div>

        <ViewName namesProps={this.state.names}/>
      </div>


    )

  }

}
const ViewName = (props) => {

  let data = props.namesProps
  console.log(data)
  return(
    <div>
      <div className='navHeader'>
          <img className='navLogo' src={require('./images/navlogo.png')}/>
          <img className='irLogo' src={require('./images/IRlogo.png')}/>
      </div>
      <div className='bgImg'>
      </div>
      <div className='squareText'>
        <p>Welcome to the Live Washing Up Rota!</p>
        <p>This site will tell which lucky individuals turn it is to wash up</p>
        <p>The next person to do the washing up is <br />{data}!</p>
      </div>
      <div className='footer'>
        <img className='irLogo' src={require('./images/IRlogo.png')}/>
      </div>
    </div>

  )

}

export default WashingUp;
