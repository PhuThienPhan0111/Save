import React, { Component } from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {Table} from "react-bootstrap";
import { AddShopModals } from './AddShopModals';
import { EditShopModals } from './EditShopModals';
export class Shop extends Component {
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
        const response = await fetch("https://localhost:44315/api/shop", {
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
            fetch("https://localhost:44315/api/shop/" + code, {
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
        const {items, shop_code, name, location} = this.state;
        let addModalClose = () => this.setState({addModalShow: false})
        let editModalClose = () => this.setState({editModalShow: false})
        const limit = 3;

        return (
            <div className="container">
                   <div className='row justify-content-between align-items-center'>
                            <div class="col">
                            <h1>Shop List</h1>
                            </div>
                            <div class="col">
                            <ButtonToolbar className='d-flex justify-content-end'>
                                <Button
                                variant='primary'
                                onClick={()=> this.setState({addModalShow:true})}
                                >Add</Button>
                                <AddShopModals show = {this.state.addModalShow}
                                onHide = {addModalClose}/>
                            </ButtonToolbar>
                    </div>                    
                    </div>
                <div className="row">
                <div className="col-sm-12">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Mã Cửa Hàng</th>
                            <th>Tên Cửa Hàng</th>
                            <th>Địa Chỉ</th>
                            <th>Setting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item) => (
                                <tr>
                                    <td>{item.shopCode}</td>
                                    <td>{item.name}</td>
                                    <td>{item.location}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className='mr-2' variant='info' 
                                            onClick={() => this.setState({editModalShow: true, 
                                                shop_code: item.shopCode, name: item.name, location: item.location})}>
                                                Edit
                                            </Button>
                                            <Button className='mr-2 ms-2' variant='danger' 
                                            onClick={() => this.deleteItem(item.shopCode)}>
                                                Delete
                                            </Button>
                                            <EditShopModals show={this.state.editModalShow} onHide = {editModalClose} 
                                            shop_code = {shop_code} name = {name} location = {location} >

                                            </EditShopModals>
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
