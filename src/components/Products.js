import React, { Component } from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {Table} from "react-bootstrap";
import { AddProductsModals } from './AddProductsModals';
import { EditProductsModals } from './EditProductsModals';
export class Products extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [], loading: true , addModalShow: false, editModalShow: false};
    }

    componentDidMount() {
        this.SetItems();
    }
    componentDidUpdate(){
        this.SetItems();
    }
    async SetItems() {
        const response = await fetch("https://localhost:44315/api/products", {
            method: 'GET',
            headers: {
              accept: 'application/json',
            },
          });
        const data = await response.json();
        this.setState({ items: data, loading: false });
    }

    deleteItem(code){
        if(window.confirm('Sure?')){
            fetch("https://localhost:44315/api/products/" + code, {
                method: 'DELETE',
                headers: {
                  "Accept": 'application/json',
                  "Content-Type":'application/json',
                },                
              }).then( res => res.json())
              .then((result) =>{
                    //alert(result)
                    this.setState({notification:true, noti_message:result})
              },
              (error) =>{
                this.setState({notification:true, noti_message:"Not Good"})
              })
        }
    }

    render() {
        const {items, product_code, name, price, shop_code} = this.state;
        let addModalClose = () => this.setState({addModalShow: false})
        let editModalClose = () => this.setState({editModalShow: false})
        return (
            <div className="container">
                <div className='row justify-content-between align-items-center'>
                            <div class="col">
                            <h1>Products List</h1>
                            </div>
                            <div class="col">
                            <ButtonToolbar className='d-flex justify-content-end'>
                                <Button
                                variant='primary'
                                onClick={()=> this.setState({addModalShow:true})}
                                >Add</Button>
                                <AddProductsModals show = {this.state.addModalShow}
                                onHide = {addModalClose}/>
                            </ButtonToolbar>
                    </div>                    
                    </div>
                <div className="row">
                <div className="col-sm-12">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Mã Sản phẩm</th>
                            <th>Tên Sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Setting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item) => (
                                <tr>
                                    <td>{item.productCode}</td>
                                    <td>{item.name}</td>
                                    <td>{item.priceDisplay}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className='mr-2' variant='info' 
                                            onClick={() => this.setState({editModalShow: true, 
                                                product_code: item.productCode, name: item.name, price: item.price, shop_code: item.shopCode})}>
                                                Edit
                                            </Button>
                                            <Button className='mr-2 ms-2' variant='danger' 
                                            onClick={() => this.deleteItem(item.productCode)}>
                                                Delete
                                            </Button>
                                            <EditProductsModals show={this.state.editModalShow} onHide = {editModalClose} 
                                            product_code = {product_code} name = {name} price = {price} shop_code = {shop_code} >

                                            </EditProductsModals>
                                        </ButtonToolbar>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
                </div>
            </div>
        );
    }
}
