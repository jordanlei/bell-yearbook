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
      backgroundImage: "linear-gradient(rgb(208, 212, 229), rgb(159, 167, 201))", 
      backgroundAttachment: "fixed",     
      backgroundSize: "cover"
    }

    return (
      <div style={titleStyle}>
      <Layout light>
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
            <p><i>This website was built by <br/>Jordan Lei, a senior in the M&amp;T Program.</i></p>
            </div>
            </Fade>
            </Col>
            <Col md={2}>
            </Col>
            <Col md={6}>
            <Fade duration={3000}>
              <div className="center-row">
                <h4>To Whom It May Concern,<br/><br/></h4>
              </div>
              </Fade>
              <Fade bottom>
              <p>
              The purpose of this resume book is to showcase the diversity of talent in the
              Jerome Fisher Program in Management and Technology at the University of Pennsylvania. It is important to note that not all students in the Jerome Fisher Program
              are featured in this book and that not all students included in this book are actively
              seeking employment.
              </p>
              </Fade>
              <Fade bottom>
              <p>
              This resume book aims to highlight the academic foci of the Program’s students
              along with their unique skill sets and interests. Given the interdisciplinary nature of
              the students’ curricula, many of them are particularly well-positioned to embark in
              internships and careers beginning in product management, management consulting, financial technologies, venture capital, and entrepreneurship.
              </p>
              </Fade>

              <Fade bottom>
              <p>
              Outside the classroom, Jerome Fisher Program students are involved in leading
              student run initiatives on campus. They can be found in student government,
              pre-professional consulting and investing clubs, student-run small-business incubators, investment funds, and even varsity sports.
              Perhaps what makes the Program a truly impressive and well-rounded community
              of students is the wide-variety of interesting ventures our students explore. From
              the development of a commercial video game to authoring books and creating art,
              Jerome Fisher Program students are true innovators and game-changers.
              </p>
              </Fade>

              <Fade bottom>
              <p>
              The students featured in this resume book have agreed to have their information
              shared with companies and potential employers and may be contacted directly at
              the e-mail addresses provided.
              Please feel free to get in touch with us if you have any questions about the program or our students.
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
