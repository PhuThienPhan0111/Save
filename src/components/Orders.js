import React, {Component} from "react";
import {Table} from "react-bootstrap";

export class Orders extends Component{
constructor(props) {
    super(props);
    this.state = { items: [], loading: true };
}

componentDidMount() {
    this.SetItems();
}

static RenderTable(items) {
    if (!items.checkData) {
        return (
            <p style={{ color: "#D84654" }}>Không Đủ Dữ Liệu</p>
        )
    }
    return (
        <div className="col-sm-12">
            <Table className="table table-striped">
                <thead>
                    <tr>
                        <th>Mã Đơn hàng</th>
                        <th>Khách Hàng</th>
                        <th>Tên Cửa Hàng</th>
                        <th>Tên Sản phẩm</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.data.map((item) => (
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
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

render() {
    let contents = this.state.loading
        ? <p><em>Đang tải...</em></p>
        : Orders.RenderTable(this.state.items);
    return (
        <div className="container">
            <h1>Danh sách Hóa đơn</h1>
            <div className="row">
                {contents}
            </div>
        </div>
    );
}

async SetItems() {
    const response = await fetch("api/orders/GetOrders")
    const data = await response.json();
    this.setState({ items: data, loading: false });
}
}
