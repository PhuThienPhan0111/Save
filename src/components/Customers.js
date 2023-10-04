import React, { Component } from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {Table} from "react-bootstrap";
import { AddCustomersModals } from './AddCustomersModals';
import { EditCustomersModals } from './EditCustomersModals';

export class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [], loading: true , addModalShow: false, editModalShow: false};
    }

    componentDidMount() {
        this.SetItems();
    }
    async SetItems() {
        const response = await fetch("https://localhost:44315/api/customers", {
            method: 'GET',
            headers: {
              accept: 'application/json',
            },
          });
        const data = await response.json();
        this.setState({ items: data, loading: false });
    }
    componentDidUpdate(){
        this.SetItems();
    }
    deleteItem(code){
        if(window.confirm('Sure?')){
            fetch("https://localhost:44315/api/customers/" + code, {
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
    // static RenderTable(items) {
    //     // const limit = 30;
    //     // if (items.length < limit) {
    //     //     return (
    //     //         <p style={{ color: "#D84654" }}>Không Đủ Dữ Liệu</p>
    //     //     )
    //     // }
    //     //const {customer_code, name, birth_day, email} = this.state;
    //     return (
            
    //     );
    // }

    render() {
        const {items, customer_code, first_name, last_name, birth_day, email} = this.state;
        // let contents = this.state.loading
        //     ? <p><em>Đang tải...</em></p>
        //     : Customers.RenderTable(this.state.items);
        let addModalClose = () => this.setState({addModalShow: false})
        let editModalClose = () => this.setState({editModalShow: false})
        const limit = 30;
        // if (items.length < limit) {
        //     return (
        //         <p style={{ color: "#D84654" }}>Không Đủ Dữ Liệu</p>
        //         )
        //     }
        return (
                <div className="container">
                    <div className='row justify-content-between align-items-center'>
                            <div class="col">
                            <h1>Customer List</h1>
                            </div>
                            <div class="col">
                            <ButtonToolbar className='d-flex justify-content-end'>
                                <Button
                                variant='primary'
                                onClick={()=> this.setState({addModalShow:true})}
                                >Add</Button>
                                <AddCustomersModals show = {this.state.addModalShow}
                                onHide = {addModalClose}/>
                            </ButtonToolbar>
                    </div>                    
                    </div>
                <div className="row">
                <div className="col-sm-12">
                <Table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Customer Code</th>
                            <th>Customer Name</th>
                            <th>BirthDay</th>
                            <th>Email</th>
                            <th>Setting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item) => (
                                <tr key={item.customerCode}>
                                    <td>{item.customerCode}</td>
                                    <td>{item.name}</td>
                                    <td>{item.birthDate}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className='mr-2' variant='info' 
                                            onClick={() => this.setState({editModalShow: true, 
                                                customer_code: item.customerCode, first_name: item.first_name, last_name: item.last_name, birth_day: item.birthDate, email: item.email})}>
                                                Edit
                                            </Button>
                                            <Button className='mr-2 ms-2' variant='danger' 
                                            onClick={() => this.deleteItem(item.customerCode)}>
                                                Delete
                                            </Button>
                                            <EditCustomersModals show={this.state.editModalShow} onHide = {editModalClose} 
                                            customer_code = {customer_code} first_name = {first_name} last_name = {last_name} birth_day = {birth_day} email = {email} >

                                            </EditCustomersModals>
                                        </ButtonToolbar>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
                </div>
            </div>
        );
    }


}