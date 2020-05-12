import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import UserLayout from './components/UserLayout'
import SimpleTitle from './components/SimpleTitle';
import { Spinner, Button, Row, Col} from 'reactstrap';
import StyleDiv from './components/StyleDiv'
import { withAuthSync } from './utils/auth'
import { Component } from 'react'
import { logout } from './utils/auth'
import Loading from './components/Loading';
import DashboardMenu from './dashboard/dashboard-menu';
import './css/dashboard.css'
import WelcomePanel from './dashboard/welcome-panel';
import ProfilePanel from './dashboard/profile-panel';
import SettingsPanel from './dashboard/settings-panel';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Profile extends Component{

    constructor (props) {
        super(props)
        this.state = {
            displayProfile: false,  
            displaySettings: false
        }

        //this.handleChange = this.handleChange.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.displayPanel = this.displayPanel.bind(this)
        this.renderPanel= this.renderPanel.bind(this)
        this.updateData= this.updateData.bind(this)
    }

    componentDidMount() {
        fetch('/api/finduser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.props.token })})
          .then(response => response.json())
          .then(data => this.setState({data}))
    }

    async handleLogout(event){
        logout()
    }

    displayPanel(panelName) {
        
        this.setState({
          displayProfile: false,
          displaySettings: false,
        });
        console.log(panelName)
        this.setState({ [panelName]: true });
    }

    updateData(newState) {
        console.log("Updating Data...")
        this.setState({data: newState});
    }
    

    renderPanel() {
        if (this.state.displayProfile) {
            return (
                <ProfilePanel data={this.state.data} displayPanel= {this.displayPanel} 
                updateData= {this.updateData}/>
            );
        } else if (this.state.displaySettings) {
            return (
                <SettingsPanel data={this.state.data} displayPanel= {this.displayPanel}
                updateData= {this.updateData}/>
            );
        }
        else{
            return (
                <WelcomePanel data={this.state.data} displayPanel= {this.displayPanel}/>
            );
        }
    }

    render(){
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
    }
    
}

export default withAuthSync(Profile)