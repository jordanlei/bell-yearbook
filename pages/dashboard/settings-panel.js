import React, { Component } from 'react';
import { Alert, Button, ButtonGroup, Row, Col, 
  Form, FormGroup, Label, Input, Card, Collapse} from 'reactstrap';
import { Link } from 'react-router-dom';
import DashboardMenu from './dashboard-menu';
import Fade from 'react-reveal/Fade';

class SettingsPanel extends Component {
  constructor(props) {
    super(props);
    this.state= {
      error: '',

      username: this.props.data.username,
      password: this.props.data.password, 
      firstName: this.props.data.firstName, 
      lastName: this.props.data.lastName, 
      email: this.props.data.email,
      year: this.props.data.year,
      bio: this.props.data.bio, 
      funFact: this.props.data.funFact, 
      submitted: false,
      
      avatar: this.props.data.avatar,

      phone: this.props.data.phone, 
      concentrations: this.props.data.concentrations,  

      position1: this.props.data.position1,
      place1: this.props.data.place1, 
      location1: this.props.data.location1, 
      startMonth1: this.props.data.startMonth1, 
      startYear1: this.props.data.startYear1, 
      endMonth1: this.props.data.endMonth1, 
      endYear1: this.props.data.endYear1, 
      description1: this.props.data.description1, 
      description1error: '',

      position2: this.props.data.position2,
      place2: this.props.data.place2,  
      location2: this.props.data.location2, 
      startMonth2: this.props.data.startMonth2, 
      startYear2: this.props.data.startYear2, 
      endMonth2: this.props.data.endMonth2, 
      endYear2: this.props.data.endYear2, 
      description2: this.props.data.description2, 
      description2error: '',

      position3: this.props.data.position3,
      place3: this.props.data.place3,  
      location3: this.props.data.location3, 
      startMonth3: this.props.data.startMonth3, 
      startYear3: this.props.data.startYear3, 
      endMonth3: this.props.data.endMonth3, 
      endYear3: this.props.data.endYear3, 
      description3: this.props.data.description3, 
      description3error: '',

      industries: this.props.data.industries, 
      tags: this.props.data.tags,

      isLive: this.props.data.isLive, 
      rSelected: '',

      collapse: false,
      justUpdated: false
    }

    this.handleInputChange= this.handleInputChange.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
    this.onRadiobtnClick = this.onRadioBtnClick.bind(this)

  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.id;
    const value = target.value;
    this.setState({
        [name]: value,
        submitted: false
    });
    switch(name){
        case "password":
            if(value== "password")
            {
                this.setState({error: "Seriously? Your password is password? Try again, fam."})
            }
            else if(value.length < 5)
            {
                this.setState({error: "Try a longer password."})
            }
            else
            {
                this.setState({error: ""})
            }
            break
        case "username":
            if(value.length==0){
                this.setState({error: "Username field cannot be empty."})
            }
            else
            {
                this.setState({error: ""})
            }
            break
    }
  }

  async handleSubmit (event) {
    console.log("updating...")

    var json = {
      username: this.state.username,
      password: this.state.password, 
      firstName: this.state.firstName, 
      lastName: this.state.lastName, 
      email: this.state.email,
      year: this.state.year,
      bio: this.state.bio, 
      funFact: this.state.funFact, 

      phone: this.state.phone, 
      concentrations: this.state.concentrations,  

      avatar: this.state.avatar,

      position1: this.state.position1, 
      location1: this.state.location1, 
      place1: this.state.place1,
      startMonth1: this.state.startMonth1, 
      startYear1: this.state.startYear1, 
      endMonth1: this.state.endMonth1, 
      endYear1: this.state.endYear1, 
      description1: this.state.description1, 

      position2: this.state.position2, 
      location2: this.state.location2, 
      place2: this.state.place2,
      startMonth2: this.state.startMonth2, 
      startYear2: this.state.startYear2, 
      endMonth2: this.state.endMonth2, 
      endYear2: this.state.endYear2, 
      description2: this.state.description2, 

      position3: this.state.position3, 
      location3: this.state.location3,
      place3: this.state.place3, 
      startMonth3: this.state.startMonth3, 
      startYear3: this.state.startYear3, 
      endMonth3: this.state.endMonth3, 
      endYear3: this.state.endYear3, 
      description3: this.state.description3, 

      industries: this.state.industries, 
      tags: this.state.tags,

      isLive: this.state.isLive
    };

    try {
      const response = await fetch(`/api/updateuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      })

      if (response.ok) {
        response.json().then(res => 
            {
                this.props.updateData(res)
                this.setState({error: '', submitted: true, justUpdated: false})
            })
      } else {
        // https://github.com/developit/unfetch#caveats
        this.setState({error: "Username is Taken"})
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      )
    }
  }

  onRadioBtnClick(active) {
      this.setState({isLive: active, submitted: false, justUpdated:true});
  }

  render() {
    var successMessage = <div></div>
    if (this.state.submitted)
    {
      successMessage = <Alert color="success">Successfully updated.</Alert>
    }

    var errorMessage = <div></div>
    if (this.state.error)
    {
      errorMessage = <Alert color="danger">{this.state.error}</Alert>
    }

    var activeMessage= <div></div>
    if (this.state.justUpdated)
    {
      if(this.state.isLive)
      {
        activeMessage = <Alert color="success">Your profile will be live once you save.</Alert>
      }
      else
      {
        activeMessage = <Alert color="danger">Your profile will be deactivated once you save.</Alert>
      }
    }

    return (
        <div className= "dashboard-container" style= {{backgroundImage: "linear-gradient(rgb(36, 52, 88), rgb(8, 17, 44))"}}>
        <Row>
          <Col md={2}>
            <DashboardMenu dark displayPanel={this.props.displayPanel}/>
          </Col>
          <Col md={10}>
          <Fade duration={3000}>
            <div style= {{color: "rgba(255, 255, 255, 0.7)", textAlign: "center", paddingTop: "15vh"}}>
            <h2>Here are Your Settings.</h2>
            </div>
            <Fade bottom delay= {500} duration={2000}>
            <Card style={{padding:"5%", margin: "5%", marginRight: "20vw", marginLeft: "20vw", backgroundColor: "rgba(255, 255, 255, 0.7)"}}>
            {successMessage}
            {errorMessage}
            <Form>
                    <FormGroup>
                    <Label for="firstName">Username</Label>
                    <Input
                        type="text"
                        id="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        disabled
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    </FormGroup>
                    {activeMessage}
                    <ButtonGroup>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(true)} active={this.state.isLive}>Activate</Button>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(false)} active={!this.state.isLive}>Deactivate</Button>                    </ButtonGroup>

                    <div className="center-row" style={{paddingTop: "1em"}}>
                        <Button id="submit" onClick={this.handleSubmit} disabled={this.state.error}>
                                Save
                        </Button>
                    </div>
            </Form>
            </Card>
            </Fade>
          </Fade> 
          </Col>
        </Row>
        </div>  
        
    );
  }
}


export default SettingsPanel;