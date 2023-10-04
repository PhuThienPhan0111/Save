import React, {Component} from 'react';
import { NavLink } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

export class Navigation extends Component{
    render(){
        return(
            <header>
            <Navbar bg="white" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link className="d-inline p-2 mx-1 bg-dark text-white" href="/">Đơn hàng</Nav.Link>
                        <Nav.Link className="d-inline p-2 mx-1 bg-dark text-white" href="/customers">Khách hàng</Nav.Link>
                        <Nav.Link className="d-inline p-2 mx-1 bg-dark text-white" href="/shop">Cửa hàng</Nav.Link>
                        <Nav.Link className="d-inline p-2 mx-1 bg-dark text-white" href="/products">Sản phẩm</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
    }
}