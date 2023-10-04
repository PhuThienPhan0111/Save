import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup, FormLabel, FormControl} from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

export class AddOrdersModals extends Component{
    constructor(props){
        super(props);
        this.state = {customers_items : [], shop_items : [], products_items : [], notification : false, noti_message: '', price : 0};
        this.handleAdd = this.handleAdd.bind(this);
    }

    componentDidMount() {
        this.SetItems(null);
    }

    SetItems(code) {
        fetch("https://localhost:44315/api/customers")
        .then( res => res.json())
        .then(data =>{
              this.setState({customers_items:data})
              
        });
        fetch("https://localhost:44315/api/shop")
        .then( res => res.json())
        .then(data =>{
              this.setState({shop_items:data})
              this.getProduct(code == null ? data[0].shopCode : code);
        });  
    }

    getProduct(code){
        fetch("https://localhost:44315/api/products/" + code)
        .then( res => res.json())
        .then(data =>{
              this.setState({products_items:data, price: data[0].price})
        });  
    }

    handleChangeShop = (event) => {
        event.preventDefault();
        this.getProduct(event.target.value);
    }

    handleChangeProduct = (event) => {
        event.preventDefault();
        const found = this.state.products_items.find(product => {
            return product.productCode === parseInt(event.target.value);
          });    
        this.setState({price: found.price})
    }

    notificationClose = (event) => {
        this.setState({shop_item: [], notification: false});
    }

    handleAdd(event){
        event.preventDefault();
        fetch("https://localhost:44315/api/orders", {
            method: 'POST',
            headers: {
              "Accept": 'application/json',
              "Content-Type":'application/json',
            },           
            body: JSON.stringify({
                customer_code: event.target.Customer.value,
                product_code: event.target.Product.value,
                shop_code: event.target.Shop.value,
                price : event.target.Price.value,
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
              Add Order
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={12}>
                        <Form onSubmit={this.handleAdd}>
                            <Form.Group controlId='Customer'>
                                <Form.Label>Customer</Form.Label>
                                <Form.Control as='select'>
                                    {this.state.customers_items.map(customer =>
                                        <option value={customer.customerCode}>{customer.name}</option>
                                        )}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='Shop'>
                                <Form.Label>Shop</Form.Label>
                                <Form.Control as='select' onChange ={this.handleChangeShop}>
                                    {this.state.shop_items.map(shop =>
                                        <option value={shop.shopCode}>{shop.name}</option>
                                        )}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='Product'>
                                <Form.Label>Product</Form.Label>
                                <Form.Control as='select' onChange ={this.handleChangeProduct}>
                                    {this.state.products_items.map(product =>
                                        <option value={product.productCode}>{product.name}</option>
                                        )}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='Price'>
                                <Form.Control className='d-none' type='text' name='Price' disabled value={this.state.price}/>
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