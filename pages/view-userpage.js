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
import NotFound from './notfound';
import { withAuthSync } from './utils/auth';
import cookie from 'js-cookie';
import CommentForm from './commentform';

class ViewUserPage extends Component{

    constructor (props) {
        super(props)
        this.state = {
            collapse: false,
            isOwn: false, 
        }
        this.renderCards= this.renderCards.bind(this)
        this.renderCardGroups= this.renderCardGroups.bind(this)
        this.toggle= this.toggle.bind(this)
        this.shuffle= this.shuffle.bind(this)
    }

    async componentDidMount() {
        //if the user is logged in ...
        if(cookie.get('token')){
            const response = await fetch('/api/finduser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: cookie.get('token')})})
            if (response.ok){
                if (cookie.get('token') == this.props.name)
                {
                    this.setState({isOwn: true})
                }
                response.json().then(data => {
                    this.setState({fromuser: data})
                    this.setState({userLoggedIn: true})
                })
            }
            else{
                this.setState({userError: "User Not Found"})
            }
        }
        else
        {
            this.setState({userLoggedIn: false})
        }
        
        //get the user whose page will be viewed
        try {
            const response = await fetch('/api/finduser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: this.props.name })})
            if (response.ok){
                response.json().then(data => {
                    this.setState({user: data})
                })
            }
            else{
                this.setState({userError: "User Not Found"})
            }
        }
        finally{
            var json= {to: this.props.name}
            try {
                const response = await fetch(`/api/findcomments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json),
                })
                if (response.ok) {
                response.json().then(data => {
                    this.setState({data: data})
                    console.log("okay")
                    console.log(this.state.data)
                })
                } else {
                // https://github.com/developit/unfetch#caveats
                this.setState({error: "No Comments Found"})
                }
            } catch (error) {
                console.error(
                'You have an error in your code or there are Network issues.',
                error
                )
            }
            this.setState({loaded: true})
        }
    }

    toggle(event) {
        var username= event.target.id
        var collapsename= "collapse" + username
        this.setState(state => ({ [collapsename]: !this.state[collapsename] }));
    }

    renderCards(){
        return this.state.data.map((state)=>
        {
            var imageStyle=
            {backgroundImage: "url("+ state.avatar +")", 
            width: "100px", 
            height: "100px", 
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

            var cardStyle={
                width:"24vw", 
                marginBottom: "10%", 
                marginLeft: "5%", 
                marginRight: "5%",
                backgroundColor: "rgba(0, 0, 0, 0.7)"
            }
            
            var comment= <div></div>
            if(state.comment)
            {
                comment= 
                <h5>
                    <br/>
                    <b>"</b>{state.comment}<b>"</b><br/>
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
                </div>
                {comment}
                </div>)
            if (!state.isLive)
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
        var cards= this.renderCards().reverse();
        var deck= [];
        var length= Math.floor((cards.length)/3)
        var lengths = []

        if (cards.length % 3 == 1)
        {
            lengths = [length + 1, length, length]
        }
        else if (cards.length % 3 == 2)
        {
            lengths = [length + 1, length + 1, length]
        }
        else
        {
            lengths = [length, length, length]
        }

        for(var i= 0; i< 3; i++)
        {
        var removed = cards.splice(0, lengths[i])
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
            backgroundImage: "linear-gradient( rgb(8, 17, 44), rgb(16, 34, 88)) " , 
            backgroundAttachment: "fixed",     
            backgroundSize: "cover",
            color: "rgba(255, 255, 255, 0.9)"
        }

        if(this.state.userError){
            return(
                <NotFound/>
            )
        }

        var commentform = <div></div>
        if(this.state.user){
            if(this.state.fromuser){
                var data = {
                    from: this.state.fromuser.username, 
                    firstName: this.state.fromuser.firstName, 
                    lastName: this.state.fromuser.lastName, 
                    avatar: this.state.fromuser.avatar, 
                    to: this.state.user.username
                }
                commentform = <CommentForm data = {data}/>
            }
        }
        
        if(this.state.data){
            var avatar = <div></div>
            if(this.state.user.avatar){
                var imageStyle=
                    {backgroundImage: "url("+ this.state.user.avatar +")", 
                        width: "25vw", 
                        height: "25vw", 
                        margin: "0 auto",
                        backgroundPosition:"center",
                        backgroundSize:"cover",
                        marginBottom: "1em",
                    }
                avatar= <Card style={imageStyle}></Card>
            }

            
            return(
            <div style={titleStyle}>
            <Layout>
                <SimpleTitle>
                <div>
                <Fade bottom duration={3000}>
                <div style={{width: "50vw", margin:"0 auto"}}>
                    <Row>
                        <Col md= {6}>
                            {avatar}
                        </Col>
                        <Col md = {6}>
                        <h2>{this.state.user.firstName} {this.state.user.lastName}</h2>
                        <p>{this.state.user.bio}</p>
                        </Col>
                    </Row>
                    {commentform}
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
    }
    
}

export default withAuthSync(ViewUserPage)