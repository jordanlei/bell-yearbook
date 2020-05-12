import React, { Component } from 'react';
import { Alert, Button, ButtonGroup, Row, Col, 
  Form, FormGroup, Label, Input, Card, Collapse} from 'reactstrap';
import { Link } from 'react-router-dom';
import DashboardMenu from './dashboard-menu';
import Fade from 'react-reveal/Fade';

class ProfilePanel extends Component {
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

      collapse: false
    }

    this.handleInputChange= this.handleInputChange.bind(this)
    this.handleMultiInputChange = this.handleMultiInputChange.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
    this.toggle= this.toggle.bind(this)
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
        case "year":
            var year= new Date().getFullYear() + 4
            if(value > year)
            {
                this.setState({error: "Please choose a valid year."}) 
            }
            else
            {
                this.setState({error: ""})
            }
            break
        case "firstName":
            if(value.length==0){
                this.setState({error: "First name field cannot be empty."})
            }
            else
            {
                this.setState({error: ""})
            }
            break
        case "lastName":
            if(value.length==0){
                this.setState({error: "Last name field cannot be empty."})
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
        case "email":
            if(value.length==0){
                this.setState({error: "Email field cannot be empty."})
            }
            else if (!(value.includes("seas") || value.includes("wharton")))
            {
                this.setState({error: "Please enter a valid SEAS or Wharton email."})
            }
            else
            {
                this.setState({error: ""})
            }
            break
        case "description1":
          if(value.length>250){
              this.setState({error: "Experience 1 description is too long."})
              this.setState({description1error: "Description exceeds max length. Count: " + value.length})
          }
          else
          {
              this.setState({error: ""})
              this.setState({description1error: ""})
          }
          break
        case "description2":
          if(value.length>250){
              this.setState({error: "Experience 2 description is too long."})
              this.setState({description2error: "Description exceeds max length. Count: " + value.length})
          }
          else
          {
              this.setState({error: ""})
              this.setState({description2error: ""})
          }
          break
        case "description3":
          if(value.length>250){
              this.setState({error: "Experience 3 description is too long."})
              this.setState({description3error: "Description exceeds max length. Count: " + value.length})
          }
          else
          {
              this.setState({error: ""})
              this.setState({description3error: ""})
          }
          break
    }
  }


  handleMultiInputChange(event){
    const options= event.target.options; 
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    value.sort()
    this.setState({industries: value})
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
                this.setState({error: '', submitted: true})
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

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    var activeMessage= <div></div>
    if(!this.state.isLive)
    {
      activeMessage= <Alert color= 'danger'>Your profile isn't live. You can change this in Settings.</Alert>
    }

    var errorMessage= <div></div>
    if(this.state.error)
    {
        console.log("error")
        errorMessage= <Alert color= 'danger'>{this.state.error}</Alert>
    }

    var description1ErrorMessage= <div></div>
    if(this.state.description1error)
    {
      console.log("description1 error")
       description1ErrorMessage= <Alert color= 'danger'>{this.state.description1error}</Alert>
    }

    var description2ErrorMessage= <div></div>
    if(this.state.description2error)
    {
        description2ErrorMessage= <Alert color= 'danger'>{this.state.description2error}</Alert>
    }

    var description3ErrorMessage= <div></div>
    if(this.state.description3error)
    {
        description3ErrorMessage= <Alert color= 'danger'>{this.state.description3error}</Alert>
    }

    var saveSuccess= <div></div>
    if(this.state.submitted)
    {
        saveSuccess= <Alert color= 'success'>Successfully Updated Profile.</Alert>
    }

    var cardStyle={
      width:"25em", 
      marginTop: "10vh", 
      marginLeft: "5%", 
      marginRight: "5%",
      marginBottom: "10vh",
      backgroundColor: "rgba(255, 255, 255, 0.7)"
    }

    
    

    var months= ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var monthOptions= months.map((val) => {
      return (<option>{val}</option>)
    })

    var year= new Date().getFullYear()
    var yearOptions= []
    yearOptions.push(<option>{""}</option>)
    for(var i= year-5; i <= year+2; i++)
    {
      yearOptions.push(<option>{i}</option>)
    }
    

    var industries= ["BioTech", "Consulting", "Data Science", 
    "Electrical Engineering", "Investment Banking", "Machine Learning/AI", "Mechanical Engineering", "Nonprofit", 
    "Private Equity/ VC", "Product Management", "Public Policy", "Hedge Funds/ Trading"]
    var industryOptions= industries.map((val) => {
      return (<option>{val}</option>)
    })

    var selectedIndustries= this.state.industries.map((val) =>{
      return (<Button color="secondary" disabled style={{margin:"5px"}}>{val}</Button>)
    })



    
    
    

    var state= this.state

    var imageStyle=
      {backgroundImage: "url("+ state.avatar +")", 
        width: "12em", 
        height: "12em", 
        margin: "0 auto",
        backgroundPosition:"center",
        backgroundSize:"cover",
        marginBottom: "1em",
      }

    var avatar= <div></div>
    if(state.avatar)
    {
      avatar= <Card style={imageStyle}></Card>
    }

    var position1= <div></div>
            if(state.position1)
            {
                position1= 
                <h5>
                <b>{state.position1}, {state.place1}</b><br/>
                <i>{state.startMonth1} {state.startYear1} - {state.endMonth1} {state.endYear1}</i><br/>
                {state.description1}<br/><br/>
                </h5>

            }

            var position2= <div></div>
            if(state.position2)
            {
                position2= 
                <h5>
                    <b>{state.position2}, {state.place2}</b><br/>
                    <i>{state.startMonth2} {state.startYear2} - {state.endMonth2} {state.endYear2}</i><br/>
                    {state.description2}<br/><br/>
                </h5>

            }

            var position3= <div></div>
            if(state.position3)
            {
                position3= 
                <h5>
                    <b>{state.position3}, {state.place3}</b><br/>
                    <i>{state.startMonth3} {state.startYear3} - {state.endMonth3} {state.endYear3}</i><br/>
                    {state.description3}<br/><br/>
                </h5>

            }

            var funFact= <div></div>
            if(state.funFact)
            {
                funFact= 
                <h5>
                    <br/>
                    <b>Fun Fact: </b>{state.funFact}<br/>
                    <br/>
                </h5>

            }



    var cardContent= 
    (<div style={{padding: "10%"}}>
      {avatar}
      <div style={{textAlign: "center"}}>
      <h4>{state.firstName} {state.lastName}</h4>
      <h5><b>Class of {state.year}</b></h5>
      <Collapse isOpen={this.state.collapse}>
      <h5><b>{state.phone}</b></h5>
      </Collapse>
      <h5><b>{state.email}</b></h5>
      </div>
      <h5>
        <br/>
        <b>Concentrations: </b>{state.concentrations}<br/>
        <br/>
      </h5>

      <Collapse isOpen={this.state.collapse}>
      {position1}

      {position2}

      {position3}
      </Collapse>


      <h5>
        <b>Industries: </b><br/>
        {selectedIndustries}
      </h5>

      <Collapse isOpen={this.state.collapse}>
      {funFact}
      </Collapse>
      

      <Button outline color="secondary" block onClick= {this.toggle}>See More</Button>

    </div>)

    return (
      <div className= "dashboard-container" style= {{backgroundImage: "linear-gradient(rgb(36, 52, 88), rgb(8, 17, 44))"}}>
      <Row>
        <Col md={2}>
          <DashboardMenu dark displayPanel={this.props.displayPanel}/>
        </Col>
        <Col md={5}>
        <Fade duration={3000}>
          <div style= {{color: "rgba(255, 255, 255, 0.7)", paddingTop: "10vh"}}>
          <h2 style= {{textAlign: "center"}}>This is Your Profile.</h2>

          <Form style={{paddingLeft: "5%", paddingRight:"5%", paddingTop: "2em", paddingBottom: "10%"}}>
                    
                    <h4 style={{textAlign: "center", paddingTop: "1em"}}>General Information</h4>
                    <Row>
                        <Col md={6}>
                        <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input
                            type="text"
                            id="firstName"
                            value={this.state.firstName}
                            onChange={this.handleInputChange}
                        />
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                        <Label for="lastName">Last Name </Label>
                        <Input
                            type="text"
                            id="lastName"
                            value={this.state.lastName}
                            onChange={this.handleInputChange}
                        />
                        </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="year">Class Year</Label>
                        <Input
                            type="number"
                            id="year"
                            value={this.state.year}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">Phone (No Dashes or Parentheses)</Label>
                        <Input
                            type="phone"
                            id="phone"
                            value={this.state.phone}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="concentrations">Concentrations (Separated by Commas)</Label>
                        <Input
                            type="text"
                            id="concentrations"
                            value={this.state.concentrations}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>

                    <div>
                    <h4 style={{textAlign: "center", paddingTop: "1em"}}>Experience 1</h4>
                    <FormGroup>
                        <Label for="position1">Position (e.g. Intern)</Label>
                        <Input
                            type="text"
                            id="position1"
                            value={this.state.position1}
                            onChange={this.handleInputChange }
                        />
                    </FormGroup>
                    <Row>
                      <Col md={6}>
                      <FormGroup>
                        <Label for="place1">Place (e.g. Penn)</Label>
                        <Input
                            type="text"
                            id="place1"
                            value={this.state.place1}
                            onChange={this.handleInputChange}
                        />
                      </FormGroup>
                      </Col>
                      <Col md={6}>
                      <FormGroup>
                        <Label for="location1">Location (e.g. Philadelphia, PA)</Label>
                        <Input
                            type="text"
                            id="location1"
                            value={this.state.location1}
                            onChange={this.handleInputChange}
                        />
                      </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                      <FormGroup>
                        <Label for="startMonth1">Start Month</Label>
                        <Input
                            type="select"
                            id="startMonth1"
                            value={this.state.startMonth1}
                            onChange={this.handleInputChange}>
                            {monthOptions}
                        </Input>
                      </FormGroup>
                      </Col>
                      <Col md={3}>
                      <FormGroup>
                        <Label for="startYear1">Start Year</Label>
                        <Input
                            type="select"
                            id="startYear1"
                            value={this.state.startYear1}
                            onChange={this.handleInputChange}>
                            {yearOptions}
                        </Input>
                      </FormGroup>
                      </Col>
                      <Col md={3}>
                      <FormGroup>
                        <Label for="endMonth1">End Month</Label>
                        <Input
                            type="select"
                            id="endMonth1"
                            value={this.state.endMonth1}
                            onChange={this.handleInputChange}>
                            {monthOptions}
                        </Input>
                      </FormGroup>
                      </Col>
                      <Col md={3}>
                      <FormGroup>
                        <Label for="endYear1">End Year</Label>
                        <Input
                            type="select"
                            id="endYear1"
                            value={this.state.endYear1}
                            onChange={this.handleInputChange}>
                            {yearOptions}
                        </Input>
                      </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                        <Label for="description1">Description (Max 250 Chars)</Label>
                        <Input
                            style={{minHeight: "5em"}}
                            type="textarea"
                            id="description1"
                            value={this.state.description1}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    {description1ErrorMessage}
                    </div>

                    <div>
                    <h4 style={{textAlign: "center", paddingTop: "1em"}}>Experience 2</h4>
                    <FormGroup>
                        <Label for="position2">Position (e.g. Intern)</Label>
                        <Input
                            type="text"
                            id="position2"
                            value={this.state.position2}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <Row>
                      <Col md={6}>
                      <FormGroup>
                        <Label for="place2">Place (e.g. Penn)</Label>
                        <Input
                            type="text"
                            id="place2"
                            value={this.state.place2}
                            onChange={this.handleInputChange}
                        />
                      </FormGroup>
                      </Col>
                      <Col md={6}>
                      <FormGroup>
                        <Label for="location2">Location (e.g. Philadelphia, PA)</Label>
                        <Input
                            type="text"
                            id="location2"
                            value={this.state.location2}
                            onChange={this.handleInputChange}
                        />
                      </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                      <FormGroup>
                        <Label for="startMonth2">Start Month</Label>
                        <Input
                            type="select"
                            id="startMonth2"
                            value={this.state.startMonth2}
                            onChange={this.handleInputChange}>
                            {monthOptions}
                        </Input>
                      </FormGroup>
                      </Col>
                      <Col md={3}>
                      <FormGroup>
                        <Label for="startYear2">Start Year</Label>
                        <Input
                            type="select"
                            id="startYear2"
                            value={this.state.startYear2}
                            onChange={this.handleInputChange}>
                            {yearOptions}
                        </Input>
                      </FormGroup>
                      </Col>
                      <Col md={3}>
                      <FormGroup>
                        <Label for="endMonth2">End Month</Label>
                        <Input
                            type="select"
                            id="endMonth2"
                            value={this.state.endMonth2}
                            onChange={this.handleInputChange}>
                            {monthOptions}
                        </Input>
                      </FormGroup>
                      </Col>
                      <Col md={3}>
                      <FormGroup>
                        <Label for="endYear2">End Year</Label>
                        <Input
                            type="select"
                            id="endYear2"
                            value={this.state.endYear2}
                            onChange={this.handleInputChange}>
                            {yearOptions}
                        </Input>
                      </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                        <Label for="description2">Description (Max 250 Chars)</Label>
                        <Input
                            style={{minHeight: "5em"}}
                            type="textarea"
                            id="description2"
                            value={this.state.description2}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    {description2ErrorMessage}
                    </div>


                    <div>
                    <h4 style={{textAlign: "center", paddingTop: "1em"}}>Experience 3</h4>
                    <FormGroup>
                        <Label for="position3">Position (e.g. Intern)</Label>
                        <Input
                            type="text"
                            id="position3"
                            value={this.state.position3}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <Row>
                      <Col md={6}>
                      <FormGroup>
                        <Label for="place3">Position (e.g. Penn)</Label>
                        <Input
                            type="text"
                            id="place3"
                            value={this.state.place3}
                            onChange={this.handleInputChange}
                        />
                      </FormGroup>
                      </Col>
                      <Col md={6}>
                      <FormGroup>
                        <Label for="location3">Location (e.g. Philadelphia, PA)</Label>
                        <Input
                            type="text"
                            id="location3"
                            value={this.state.location3}
                            onChange={this.handleInputChange}
                        />
                      </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                      <FormGroup>
                        <Label for="startMonth3">Start Month</Label>
                        <Input
                            type="select"
                            id="startMonth3"
                            value={this.state.startMonth3}
                            onChange={this.handleInputChange}>
                            {monthOptions}
                        </Input>
                      </FormGroup>
                      </Col>
                      <Col md={3}>
                      <FormGroup>
                        <Label for="startYear3">Start Year</Label>
                        <Input
                            type="select"
                            id="startYear3"
                            value={this.state.startYear3}
                            onChange={this.handleInputChange}>
                            {yearOptions}
                        </Input>
                      </FormGroup>
                      </Col>
                      <Col md={3}>
                      <FormGroup>
                        <Label for="endMonth3">End Month</Label>
                        <Input
                            type="select"
                            id="endMonth3"
                            value={this.state.endMonth3}
                            onChange={this.handleInputChange}>
                            {monthOptions}
                        </Input>
                      </FormGroup>
                      </Col>
                      <Col md={3}>
                      <FormGroup>
                        <Label for="endYear3">End Year</Label>
                        <Input
                            type="select"
                            id="endYear3"
                            value={this.state.endYear3}
                            onChange={this.handleInputChange}>
                            {yearOptions}
                        </Input>
                      </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                        <Label for="description3">Description (Max 250 Chars)</Label>
                        <Input
                            style={{minHeight: "5em"}}
                            type="textarea"
                            id="description3"
                            value={this.state.description3}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    {description3ErrorMessage}
                    </div>

                    <h4 style={{textAlign: "center", paddingTop: "1em"}}>Other Information</h4>
                    <FormGroup>
                        <Label for="industries">Industries (Select up to 3)</Label>
                        <Input
                            type="select"
                            id="industries"
                            onChange={this.handleMultiInputChange}
                            multiple
                        >
                          {industryOptions}
                        </Input>
                        <Label for="industries">Selected:  </Label>
                        {selectedIndustries}
                    </FormGroup>

                    <FormGroup>
                        <Label for="avatar">Profile Photo Url <br/> 
                        (try uploading to Imgur, right click "Open Image in New Tab")</Label>
                        <Input
                            type="text"
                            id="avatar"
                            value={this.state.avatar}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="funFact">Fun Fact</Label>
                        <Input
                            style={{minHeight: "5em"}}
                            type="textarea"
                            id="funFact"
                            value={this.state.funFact}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <div className="center-row" id="submit">
                        <Button id="submit" style= {{marginBottom: "2em"}} onClick={this.handleSubmit} disabled={this.state.error}>
                                Save
                        </Button>
                    </div>
                    {errorMessage}
                    {saveSuccess}
                </Form>
          </div>
        </Fade>
        </Col>
        <Col md={5}>

          <div style={{position: "fixed", width: "100%", overflowY: "scroll", overflowX:"hidden", height:"100vh"}}>
          <Fade bottom>
          <Card style={cardStyle}>
            {activeMessage}
            {cardContent}
          </Card>
          </Fade>
          </div>
          
        </Col>
      </Row>
      </div>
    );
  }
}


export default ProfilePanel;