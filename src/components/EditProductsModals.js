import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup, FormLabel, FormControl} from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

export class EditProductsModals extends Component{
    constructor(props){
        super(props);
        this.state = {shop_items : [], notification : false, noti_message: ''};
        this.handleAdd = this.handleAdd.bind(this);
    }
    componentDidMount(){
        const response = fetch("https://localhost:44315/api/shop")
        .then( res => res.json())
        .then(data =>{
              this.setState({shop_items:data})
        });
    }
    notificationClose = (event) => {
        this.setState({notification: false});
    }
    handleAdd(event){
        event.preventDefault();
        fetch("https://localhost:44315/api/products", {
            method: 'PUT',
            headers: {
              "Accept": 'application/json',
              "Content-Type":'application/json',
            },
            
                body: JSON.stringify({
                    product_code:  event.target.ProductCode.value,
                    name: event.target.Name.value,
                    price: event.target.Price.value,
                    shop_code: event.target.Shop.value,
                })
          }).then( res => res.json())
          .then((result) =>{
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
                            <Form.Group controlId='ProductCode'>
                                <Form.Label>Product Code</Form.Label>
                                <Form.Control type='text' name='ProductCode' disabled defaultValue={this.props.product_code}/>
                            </Form.Group>
                            <Form.Group controlId='Name'>
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type='text' name='Name' required placeholder='Máy Laptop' defaultValue={this.props.name}/>
                            </Form.Group>
                            <Form.Group controlId='Price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type='text' name='Price' required placeholder='1,000,000' defaultValue={this.props.price}/>
                            </Form.Group>

                            <Form.Group controlId='Shop'>
                                <Form.Label>Shop</Form.Label>
                                <Form.Control as='select' defaultValue={this.props.shop_code}>
                                    {this.state.shop_items.map(shop =>
                                        <option value={shop.shopCode}>{shop.name}</option>
                                        )}
                                </Form.Control>
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