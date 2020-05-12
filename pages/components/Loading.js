import UserHeader from './UserHeader'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/standard.css'

import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/standard.css'
import {Component} from 'react'
import {Spinner} from 'reactstrap'



  
class Loading extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    const titleStyle= {
      textAlign: 'center', 
      minHeight: "100vh", 
      backgroundImage: "linear-gradient(rgb(208, 212, 229), rgb(159, 167, 201))", 
      backgroundAttachment: "fixed",     
      backgroundSize: "cover"
    }

    return(
      <div className= "layout" style= {titleStyle}>
        <div style= {{margin: "0 auto", width: "20vh", textAlign: "center", paddingTop: "20vh"}}>
          <h3>Please wait... <br/><br/></h3>
          <Spinner style={{ width: '4rem', height: '4rem' }} />{' '}
        </div>
      </div>
    )
  }

}

export default Loading