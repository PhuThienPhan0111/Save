import React, { Component } from 'react';
export class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [], loading: true };
    }

    componentDidMount() {
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
    static RenderTable(items) {
        const limit = 3;
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
                            <th>Mã Cửa Hàng</th>
                            <th>Tên Cửa Hàng</th>
                            <th>Địa Chỉ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item) => (
                                <tr>
                                    <td>{item.shopCode}</td>
                                    <td>{item.name}</td>
                                    <td>{item.location}</td>
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
            : Shop.RenderTable(this.state.items);
        return (
            <div className="container">
                <h1>Danh sách Cửa hàng</h1>
                <div className="row">
                    {contents}
                </div>
            </div>
        );
    }
}
