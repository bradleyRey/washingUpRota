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

    NamesApi.getCurrent(names => {
      console.log(names.data)
      console.log(names,'fkjgkfn')
      this.setState({
        names: names.data
      },function(){
        console.log(names)
      })
    })

    NamesApi.getNext(next => {
      console.log(next.data)
      this.setState({
        next: next.data
      },function(){
        console.log('The next person is',next)
      })
    })
  }
  render(){

    console.log('helooo')

    return(
      <div>

        <ViewName namesProps={this.state.names} nextProps={this.state.next}/>
      </div>


    )

  }

}
const ViewName = (props) => {

  let data = props.namesProps
  let next = props.nextProps
  console.log(data)
  var newName = data.substring(0,data.lastIndexOf("@"))
  console.log(newName+' has been modified')
  var newNewName = newName.charAt(0).toUpperCase() + newName.slice(1)
  console.log('The finished product: ',newNewName)


  return(
    <div>
      <div>
        <div className='navHeader'>
          <div className='maxWidth'>
            <img className='navLogo' src={require('./images/navlogo.png')}/>
            <img className='irLogo' src={require('./images/IRlogo.png')}/>
          </div>
        </div>
        <div className='squareText'>
          <h1>Welcome to the Live Washing Up Rota</h1>
          <p className = 'subHeader'>Is it your lucky day?</p>
          <p className='whosTurn'>Today, the Washing Up Rota chooses <strong>{data}</strong></p>
          <p className='lastSentence'>But {"don't"} worry <strong>{next}</strong>, you can show us your scrubbing skills tomorrow!</p>
        </div>
      </div>
    </div>

  )
}

export default WashingUp;
