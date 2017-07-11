import axios from 'axios';



class NamesApi {

  static getNames(callback){
    axios.post('http://localhost:8080/api/yourTurn')
      .then( response => {
        return callback(response)
    })
  }
}

export default NamesApi
