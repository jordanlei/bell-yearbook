import React, {Component} from 'react'
import {Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, 
  Media, Button} from 'reactstrap'
import StyleDiv from './components/StyleDiv'
import Layout from './components/Layout'
import SimpleTitle from './components/SimpleTitle'
import fetch from 'isomorphic-unfetch'
import './css/index.css'
import Fade from 'react-reveal/Fade'

class App extends Component{
    render() {
      var ampstyle={
        fontFamily: "'Roboto', sans-serif",
        fontSize: "60vh",
        fontWeight: 600,
        color: "rgba(168, 20, 37, 0.7)", 
      }
      const spanStyle= {
        paddingTop: "25vh",
        minHeight: "80vh",
      }

      const titleStyle= {
        textAlign: 'center', 
        minHeight: "100vh", 
        backgroundImage: "linear-gradient(rgb(36, 52, 88), rgb(8, 17, 44))"      
      }

        return (
          <div style= {titleStyle}>
            <Layout >
              
              <div style= {spanStyle}>
                <div style={{width: "30vw", margin:"0 auto"}}>
                <img src="/spinny-hat.png" style={{width: "300px", zIndex: "-1"}}></img>
                </div> 

                
              </div>
              <div style={{top: "55vh", position: "absolute", width:"100vw"}}>
              <Fade bottom duration={3000} delay={1000}>
                <h1 style={{color: "rgba(255, 255, 255, 0.7)", textAlign: "center"}}>Bell Yearbook</h1>
              </Fade> 
              </div>
            </Layout>
            </div>
          )
    }
}

export default App
