import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup, FormLabel, FormControl} from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

export class EditShopModals extends Component{
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
        fetch("https://localhost:44315/api/shop", {
            method: 'PUT',
            headers: {
              "Accept": 'application/json',
              "Content-Type":'application/json',
            },
            
                body: JSON.stringify({
                    shop_code:  event.target.ShopCode.value,
                    name: event.target.Name.value,
                    location: event.target.Location.value,
                })
          }).then( res => res.json())
          .then((result) =>{
                //alert(result)
                this.setState({notification:true, noti_message:result})
          },
          (error) =>{
            this.setState({notification:true, noti_message:"Not Good"})
          }
          )
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
                Edit Customer
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleAdd}>
                            <Form.Group controlId='CustomerCode'>
                                <Form.Label>Shop Code</Form.Label>
                                <Form.Control type='text' name='CustomerCode' disabled defaultValue={this.props.shop_code}/>
                            </Form.Group>
                            <Form.Group controlId='Name'>
                                <Form.Label>Shop Name</Form.Label>
                                <Form.Control type='text' name='Name' required placeholder='GEARVN' defaultValue={this.props.name}/>
                            </Form.Group>
                            <Form.Group controlId='Location'>
                                <Form.Label>Location</Form.Label>
                                <Form.Control type='text' name='Location' required placeholder='123/12 Nguyễn Hồng Đào, P12, Q6' defaultValue={this.props.location}/>
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