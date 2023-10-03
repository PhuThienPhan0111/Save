import React, { Component } from 'react';
export class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [], loading: true , dialogShow: false};
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
    static RenderTable(items) {
        const limit = 30;
        if (items.length < limit) {
            return (
                <p style={{ color: "#D84654" }}>Không Đủ Dữ Liệu</p>
            )
        }
        return (
            <div className="col-sm-12">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Mã Khách hàng</th>
                            <th>Tên Khách hàng</th>
                            <th>Ngày sinh</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item) => (
                                <tr>
                                    <td>{item.customerCode}</td>
                                    <td>{item.name}</td>
                                    <td>{item.birthDate}</td>
                                    <td>{item.email}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Đang tải...</em></p>
            : Customers.RenderTable(this.state.items);
        return (
            <div className="container">
                <div>
                    <h1>Danh sách Khách hàng</h1>
                </div>
                <div className="row">
                    {contents}
                </div>
            </div>
        );
    }


}