import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import SimpleTitle from './components/SimpleTitle';
import StyleDiv from './components/StyleDiv';
import { Alert, Button, ButtonGroup, Row, Col, 
    Form, FormGroup, Label, Input, Card, CardDeck, CardColumns, Collapse} from 'reactstrap';
import { Component } from 'react'
import Layout from './components/Layout';
import './css/dashboard.css'
import Fade from 'react-reveal/Fade'
import Loading from './components/Loading';

class ClassUsers extends Component{

    constructor (props) {
        super(props)
        this.state = {
            collapse: false,
        }
        this.renderCards= this.renderCards.bind(this)
        this.renderCardGroups= this.renderCardGroups.bind(this)
        this.toggle= this.toggle.bind(this)
        this.shuffle= this.shuffle.bind(this)
    }

    async componentDidMount() {
        var json= {year: this.props.year}
        console.log(json)
        try {
            const response = await fetch(`/api/findusers`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(json),
            })
            if (response.ok) {
            response.json().then(data => {
                this.setState({data: this.shuffle(data)})
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

    toggle(event) {
        var username= event.target.id
        var collapsename= "collapse" + username
        this.setState(state => ({ [collapsename]: !this.state[collapsename] }));
    }

    renderCards(){
        for( var i = 0; i < this.state.data.length; i++){ 
            if ( !this.state.data[i].isLive) {
              this.state.data.splice(i, 1); 
            }
        }

        return this.state.data.map((state)=>
        {
            var imageStyle=
            {backgroundImage: "url("+ state.avatar +")", 
            width: "12vw", 
            height: "12vw", 
            margin: "0 auto",
            backgroundPosition:"center",
            backgroundSize:"cover",
            marginBottom: "1em",
            }

            var selectedIndustries= state.industries.map((val) =>{
                return (<Button color="secondary" disabled style={{margin:"5px"}}>{val}</Button>)
            })

            var avatar= <div></div>
            if(state.avatar)
            {
                avatar= <Card style={imageStyle}></Card>
            }

            var cardStyle={
                width:"24vw", 
                marginBottom: "10%", 
                marginLeft: "5%", 
                marginRight: "5%",
                backgroundColor: "rgba(255, 255, 255, 0.7)"
            }

            var collapsename= "collapse" + state.username

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
                <div>
                {avatar}
                </div>
                <div style={{textAlign: "center"}}>
                <h4>{state.firstName} {state.lastName}</h4>
                <h5><b>Class of {state.year}</b></h5>
                <Collapse isOpen={this.state[collapsename]}>
                <h5><b>{state.phone}</b></h5>
                </Collapse>
                <h5><b>{state.email}</b></h5>
                </div>
                <h5>
                    <br/>
                    <b>Concentrations: </b>{state.concentrations}<br/>
                    <br/>
                </h5>

                <Collapse isOpen={this.state[collapsename]}>
                {position1}

                {position2}

                {position3}
                </Collapse>


                <h5>
                    <b>Industries: </b><br/>
                    {selectedIndustries}
                </h5>

                <Collapse isOpen={this.state[collapsename]}>
                {funFact}
                </Collapse>
                

                <Button outline color="secondary" block id={state.username} onClick= {this.toggle}>See More</Button>

                </div>)
            if (state.isLive)
            {
                return(
                    <Fade bottom duration={2000} delay={100}>
                    <Card style={cardStyle}>
                    {cardContent}
                    </Card>
                    </Fade>
                )
            }
            else
            {
                return
            }
        })

    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }

    renderCardGroups()
    {
        var cards= this.renderCards();
        var deck= [];
        var length= Math.floor(cards.length/3) + 1
        console.log(cards.length)
        for(var i= 0; i< 3; i++)
        {
        var removed = cards.splice(0, length)
        deck.push(
            <Col md={4}>
            {removed}
            </Col>
        )
        }
        return <Row>{deck}</Row>
    }


    
    render(){
        const titleStyle= {
            textAlign: 'center', 
            minHeight: "100vh", 
            backgroundImage: "linear-gradient(rgb(208, 212, 229), rgb(159, 167, 201))", 
            backgroundAttachment: "fixed",     
            backgroundSize: "cover"
        }

        
        if(this.state.data){
        return(
        <div style={titleStyle}>
        <Layout light>
            <SimpleTitle>
            <div>
            <Fade bottom duration={3000}>
            <div style={{width: "50vw", margin:"0 auto"}}>
                <h3>Class of {this.props.year}</h3>
            </div>
            </Fade>
            </div>
            </SimpleTitle>
            <StyleDiv >
            <div style={{marginTop: "5%"}}>
                {this.renderCardGroups()}
            </div>
            </StyleDiv>
        </Layout>
        </div>
        )
        }
        else
        {
            return(
            <div className="layout">
                    <Loading/>  
            </div>
            )
        }
        /*
        if(this.state.data)
        {
            return(
                <div className= "layout">
                    {this.renderPanel()}
                </div>
            )
        }
        else
        {
            return(
                <UserLayout>
                    <Loading/>
                </UserLayout>
            )
        }    
        */    
    }
    
}

export default ClassUsers