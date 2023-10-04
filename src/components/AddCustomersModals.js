import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup, FormLabel, FormControl} from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

export class AddCustomersModals extends Component{
    constructor(props){
        super(props);
        this.state = {notification : false, noti_message: ''};
        this.handleAdd = this.handleAdd.bind(this);
    }
    notificationClose = (event) => {
        this.setState({notification: false});
    }
    handleAdd(event){
        event.preventDefault();
        fetch("https://localhost:44315/api/customers", {
            method: 'POST',
            headers: {
              "Accept": 'application/json',
              "Content-Type":'application/json',
            },
            
                body: JSON.stringify({
                    first_name: event.target.FirstName.value,
                    last_name: event.target.LastName.value,
                    birth_date: event.target.BirthDay.value,
                    email : event.target.Email.value,
                })
          }).then( res => res.json())
          .then((result) =>{
                //alert(result)
                this.setState({notification:true, noti_message:result})
          },
          (error) =>{
            this.setState({notification:true, noti_message:"Not Good"})
          })
    }
    render(){
        return(
            <div className='container'>
                <Snackbar anchorOrigin={{vertical:'top', horizontal:'right'}}
                open = {this.state.notification}
                autoHideDuration={3000}
                onClose={this.notificationClose}
                message={<span id="message-id">{this.state.noti_message}</span>}
                action = {[
                    <IconButton key="close" aria-label="Close" color='inherit' onClick={this.notificationClose}>x</IconButton>
                ]}
                >
                </Snackbar>
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
              Add Customer
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={12}>
                        <Form onSubmit={this.handleAdd}>
                            <Form.Group controlId='LastName'>
                                <Form.Label>Customer Last Name</Form.Label>
                                <Form.Control type='text' name='LastName' required placeholder='Nguyễn'/>
                            </Form.Group>
                            <Form.Group controlId='FirstName'>
                                <Form.Label>Customer First Name</Form.Label>
                                <Form.Control type='text' name='FirstName' required placeholder='Văn A'/>
                            </Form.Group>
                            <Form.Group controlId='BirthDay'>
                                <Form.Label>BirthDay</Form.Label>
                                <Form.Control type='text' name='BirthDay' required placeholder='01/11/1997'/>
                            </Form.Group>
                            <Form.Group controlId='Email'>
                                <Form.Label>Customer Email</Form.Label>
                                <Form.Control type='text' name='Email' required placeholder='nguyenvana@email.com'/>
                            </Form.Group>

                            <Form.Group className='mt-4'>
                                <Button variant='primary' type='submit'> Save </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
            </div>
            
        );
    }
}