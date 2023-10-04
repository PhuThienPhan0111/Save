import React, { Component } from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {Table} from "react-bootstrap";
import { AddOrdersModals } from './AddOrdersModals';
import { EditOrdersModals } from './EditOrdersModals';

export class Orders extends Component{
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
        const response = await fetch("https://localhost:44315/api/orders", {
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
            fetch("https://localhost:44315/api/orders/" + code, {
                method: 'DELETE',
                headers: {
                  "Accept": 'application/json',
                  "Content-Type":'application/json',
                },                
              }).then( res => res.json())
              .then((result) =>{
                    this.setState({notification:true, noti_message:result})
              },
              (error) =>{
                this.setState({notification:true, noti_message:"Not Good"})
              })
        }
    }
    render() {
        const {order_code, customer_code, product_code, shop_code, price} = this.state;
        let addModalClose = () => this.setState({addModalShow: false})
        let editModalClose = () => this.setState({editModalShow: false})
        let contents = this.state.loading
             ? <p><em>Đang tải...</em></p>
             : this.state.items.data.map((item) => (
                <tr>
                    <td>{item.orderCode}</td>
                    <td>
                        <div>
                            {item.customerName}
                        </div>
                        <div>
                            {item.customerEmail}
                        </div>
                    </td>
                    <td>
                        <div>
                            {item.shopName}
                        </div>
                        <div>
                            {item.shopLocation}
                        </div>
                    </td>
                    <td>
                        <div>
                            {item.productName}
                        </div>
                        <div>
                            {item.productPrice}
                        </div>
                    </td>
                    <td>
                    <ButtonToolbar>
                    <Button className='mr-2' variant='info' 
                        onClick={() => this.setState({editModalShow: true, 
                            order_code: item.orderCode, customer_code: item.customerCode, shop_code: item.shopCode, product_code: item.productCode, price: item.price})}>
                        Edit
                        </Button>
                        <Button className='mr-2 ms-2' variant='danger' 
                        onClick={() => this.deleteItem(item.orderCode)}>
                        Delete
                    </Button>
                    <EditOrdersModals show={this.state.editModalShow} onHide = {editModalClose} 
                        order_code = {order_code} customer_code = {customer_code} shop_code = {shop_code} product_code = {product_code} price = {price} >
                    </EditOrdersModals>
                    </ButtonToolbar>
                    </td>
                </tr>
            ));
        if (!this.state.items.checkData) {
            return (
                <p style={{ color: "#D84654" }}>Không Đủ Dữ Liệu do {this.state.items.checkDataDisplay}</p>
            )
        }
        return (
            <div className="container">
               <div className='row justify-content-between align-items-center'>
                            <div class="col">
                            <h1>Orders List</h1>
                            </div>
                            <div class="col">
                            <ButtonToolbar className='d-flex justify-content-end'>
                                <Button
                                variant='primary'
                                onClick={()=> this.setState({addModalShow:true})}
                                >Add</Button>
                                <AddOrdersModals show = {this.state.addModalShow}
                                onHide = {addModalClose}/>
                            </ButtonToolbar>
                    </div>                    
                    </div>
                <div className="row">
                <div className="col-sm-12">
                <Table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Mã Đơn hàng</th>
                            <th>Khách Hàng</th>
                            <th>Tên Cửa Hàng</th>
                            <th>Tên Sản phẩm</th>
                            <th>Setting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contents}
                    </tbody>
                </Table>
            </div>
                </div>
            </div>
        );
    }
}
