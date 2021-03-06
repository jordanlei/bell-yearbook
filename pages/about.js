import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Layout from './components/Layout';
import SimpleTitle from './components/SimpleTitle'
import Fade from 'react-reveal/Fade'

class About extends Component {
  
  render() {
    const titleStyle= {
      textAlign: 'center', 
      minHeight: "100vh", 
      backgroundImage: "linear-gradient( rgb(0, 0, 0), rgb(12, 26, 66)) " , 
      color: "rgba(255, 255, 255, 0.9)",
      backgroundAttachment: "fixed",     
      backgroundSize: "cover"
    }

    return (
      <div style={titleStyle}>
      <Layout>
        <div style={{padding: "10%", paddingTop: "15vh" , minHeight: "60vh"}}>            
          <div>
          
          <Row>
            <Col md={1}/>
            <Col md={2}>
            <Fade duration={3000}>
            <div style={{position: "fixed", top: "40vh", width:"20vw"}}>
            <h2>About</h2>
            </div>
            <div style={{position: "fixed", top: "70vh", width:"20vw"}}>
            <p><i>Powered by Coffee, Anxiety, and a lotta Love.</i></p>
            </div>
            </Fade>
            </Col>
            <Col md={2}>
            </Col>
            <Col md={6}>
            <Fade duration={3000}>
              <div className="center-row">
                <h4>Well, here we are.<br/><br/></h4>
              </div>
              </Fade>
              <Fade bottom>
              <p>
              We finally made it. Four years of undergrad,
              countless sleepless nights staying up for finals, 
              too many coffee cups to count, and one Bell Poconos
              Retreat later (among other things), we somehow 
              made it to the other side. The people in Bell are 
              some of the kindest, most intellectually curious 
              people I know. So whether you're in 
              Philly, at home, or anywhere else in the world, 
              let's celebrate. For four years of amazing memories, 
              and for countless more to come. 
              </p>
              <p>
                If you'd like to leave a note, make an account and post 
                a comment!
              </p>

              </Fade>
              

              
            </Col>
          </Row>
          </div>
        </div>
      </Layout>
      </div>
    );
  }
}

/*
<Fade>
<div className="center-row">
<h4>
<br/>
Sincerely,<br/>
Gad Allon <br/>
</h4>
<p>
Faculty Director, The Jerome Fisher Program in Management and Technology<br/>
gadallon@wharton.upenn.edu<br/>
215-898-4145
</p>
</div>
</Fade>
*/

export default About;
