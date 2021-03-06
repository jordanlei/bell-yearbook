import React, { Component } from 'react';
import Router from 'next/router';
import { Alert, Button, Row, Col, Card, Modal, 
    ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input} from 'reactstrap';
const MicRecorder = require('mic-recorder-to-mp3')
const recorder = new MicRecorder({bitRate: 128})


class CommentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        _id: this.props.data._id, 
        from: this.props.data.from,
        firstName: this.props.data.firstName, 
        lastName: this.props.data.lastName, 
        to: this.props.data.to,
        avatar: this.props.data.avatar,
        comment: this.props.data.comment,
        tagsfrom: this.props.data.tagsfrom, 
        tagsto: this.props.data.tagsto,
        submitted: false,
        image: this.props.data.image,
        isOpen: true, 
        handleCancel: this.props.handleCancel,
        create: this.props.create,
        isRecording: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.startRecording = this.startRecording.bind(this)
        this.stopRecording = this.stopRecording.bind(this)
    }

    //generic input change handler
    handleInputChange(event) {
        const target = event.target;
        const name = target.id;
        const value = target.value;
        this.setState({
            [name]: value,
        });
    }

    startRecording(event){
        recorder.start().then(() => {
            this.setState({isRecording: true})
        }).catch((e) => {
            console.error(e);
        });
      }
    
    stopRecording(event) {
    recorder.stop().getMp3().then(([buffer, blob]) => {
        const file = new File(buffer, 'music.mp3', {
        type: blob.type,
        lastModified: Date.now()
        });
        this.setState({audiobuffer:buffer, audiotype:blob.type, isRecording: false})
        console.log(this.state)

    }).catch((e) => {
        console.error(e);
    });
    }

    async handleSubmit (event) {
        var json = {
            from: this.state.from,
            firstName: this.state.firstName, 
            lastName: this.state.lastName, 
            to: this.state.to,
            image: this.state.image, 
            avatar: this.state.avatar,
            comment: this.state.comment, 
            tagsfrom: this.state.tagsfrom, 
            tagsto: this.state.tagsto,
          };

        console.log(json)
    
        try {
          const response = await fetch(`/api/createcomment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
          })
    
          if (response.ok) {
            response.json().then(res => 
                {
                    this.setState({error: '', submitted: true})
                    Router.push('/view/'+ this.state.to)
                })
          } else {
            // https://github.com/developit/unfetch#caveats
            this.setState({error: "Comment Failed"})
          }
        } catch (error) {
          console.error(
            'You have an error in your code or there are Network issues.',
            error
          )
        }
      }

    async handleUpdate(event) {
        console.log(this.state)
        if(!this.state._id) return; 

        var json = {
            _id: this.state._id,
            comment: this.state.comment, 
            image: this.state.image,
        };

        console.log("Updating Comment...")
        console.log(json)
    
        try {
          const response = await fetch(`/api/updatecomment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
          })
    
          if (response.ok) {
            response.json().then(res => 
                {
                    this.setState({error: ''})
                    Router.push('/view/'+ this.state.to)
                })
          } else {
            // https://github.com/developit/unfetch#caveats
            this.setState({error: "Comment Failed"})
          }
        } catch (error) {
          console.error(
            'You have an error in your code or there are Network issues.',
            error
          )
        }
    }

    async handleDelete(event) {
        if(!this.state._id) return; 

        var json = {
            _id: this.state._id
        };

        console.log("Deleting Comment...")
        console.log(json)
    
        try {
          const response = await fetch(`/api/deletecomment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
          })
    
          if (response.ok) {
            response.json().then(res => 
                {
                    this.setState({error: ''})
                    Router.push('/view/'+ this.state.to)
                })
          } else {
            // https://github.com/developit/unfetch#caveats
            this.setState({error: "Comment Failed"})
          }
        } catch (error) {
          console.error(
            'You have an error in your code or there are Network issues.',
            error
          )
        }
    }

    render() {
        var errorMessage= <div></div>
        if(this.state.error)
        {
            errorMessage= <Alert color= 'danger'>{this.state.error}</Alert>
        }

        if(this.state.submitted)
        {
            console.log("Redirecting ...")
            Router.push('/view/'+ this.state.to)
        }

        //Audio recording functionality
        if(!this.state.isRecording){
            var button=<Button color="primary" onClick={this.startRecording}>Record</Button>
        }
        else{
            var button=<Button color='danger' onClick={this.stopRecording}>Stop</Button>
        }
    
        if(this.state.audio){
            console.log("Got here")
            var myRef = React.createRef();
            var audio=
            <div style={{paddingTop: "10px"}}>
                <audio controls ref={myRef} src={this.state.audio}/>
            </div>
        }
        else
        {
            var audio=<div></div>
        }


        //Format Creating Modal or Editing Modal
        if(this.state.create)
        {
            var header = <ModalHeader>Post Comment</ModalHeader>
            var footer = 
            <ModalFooter>
                <Button color="primary" onClick={this.handleSubmit}>Submit</Button>                
                <Button color="secondary" onClick={this.state.handleCancel}>Cancel</Button>
            </ModalFooter>
        }
        else
        {
            var header = <ModalHeader>Edit/Delete</ModalHeader>
            var footer = 
            <ModalFooter>
                <Button color="primary" onClick={this.handleUpdate}>Edit</Button>{'\t'}
                <Button color="danger" onClick={this.handleDelete}>Delete</Button>{'\t'}                   
                <Button color="secondary" onClick={this.state.handleCancel}>Cancel</Button>
            </ModalFooter>
        }

        if(this.state.image){
            var image = <img src={this.state.image} style={{width: "20vw", paddingTop: "10px"}}></img>
        }
        else
        {
            var image=<div></div>
        }

        return (
            <Modal isOpen={this.state.isOpen}>
                {header}
                <ModalBody>
                <Form style={{paddingLeft: "5%", paddingRight:"5%", paddingTop: "5%", paddingBottom: "5%"}}>
                    <div class="container text-center">
                        <FormGroup>
                            <h5>Leave A Comment</h5>
                            <Input
                                style={{minHeight: "10em"}}
                                type="textarea"
                                id="comment"
                                value={this.state.comment}
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <h5>(Optional) Add A Photo - URL Only</h5>
                            <Input
                                type="text"
                                id="image"
                                value={this.state.image}
                                onChange={this.handleInputChange}
                            />
                            {image}
                        </FormGroup>

                    </div>
                </Form>
                </ModalBody>
                {footer}
            </Modal>
        );
    }
  }
  
  export default CommentModal;