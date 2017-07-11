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
        <TopHeader />
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
      <p>{data}</p>
    </div>

  )

}

const TopHeader = () => {

  return (
    <div>
    <p>Hello</p>
      <div className='navHeader'>
        <img className='navLogo' src={require('./images/navlogo.png')}/>
        <img className='irLogo' src={require('./images/IRlogo.png')}/>
      </div>
{  //    <img className='navLogo' src={require('./images/washingupicon.png')}/>
}
    </div>

  )
}
export default WashingUp;
