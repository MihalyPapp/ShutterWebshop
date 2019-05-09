import React from 'react';
import OrderActions from "../actions/OrderActions";
import OrderStore from "../store/OrderStore";

class CustomerOrders extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            userOrders: [],
            username: ""
        };
    }

    _onChange() {
        this.setState({userOrders: OrderStore._ordersByUsername});
    }

    componentDidMount() {
        OrderStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        OrderStore.removeChangeListener(this._onChange);
    }

    render() {
        console.log(this.state.userOrders);
        return(
            <div style={{marginTop: '15px'}}>
                <div className="row">
                    <div className="col-auto col-1"/>
                    <div className="col-auto col-5">
                        <div className="form-group col-auto">
                            <input
                                onChange={(event) => this.setState({username: event.target.value})}
                                className="form-control" placeholder="Username" autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="col-auto">
                        <button
                            onClick={() => OrderActions.fetchOrdersByUsername(this.state.username)}
                            className="btn btn-success float-none">Fetch orders
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1"/>
                    <div className="col-auto col-10">
                        <div className="card h-100">
                            <div className="card-header">
                                Orders
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    {this.state.userOrders.map(order => {
                                        return(
                                            <li key={order._id} className="list-group-item list-group-item-action">
                                                <div className="row">
                                                    <div className="col-sm-6 col-auto">
                                                        <h6>{order.date}</h6>
                                                        <ul style={{listStyleType: 'none'}}>
                                                            <li><strong>Email:</strong> {order.infos.email}</li>
                                                            <li><strong>Address:</strong> {order.infos.address}</li>
                                                            <li><strong>State:</strong> {order.infos.state}</li>
                                                            <li><strong>City:</strong> {order.infos.city}</li>
                                                            <li><strong>Zip:</strong> {order.infos.zip}</li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-sm-6 col-auto">
                                                        <h6>Ordered Shutter(s):</h6>
                                                        {order.cartItems.map(cartItem => {
                                                            return (
                                                                <div className="mb-3 overflow-auto">
                                                                    <ul style={{listStyleType: 'none'}}>
                                                                        <li><strong>Name:</strong> {cartItem.shutter.name}</li>
                                                                        <li><strong>Part number:</strong> {cartItem.shutter.partNo}</li>
                                                                        <li><strong>Price:</strong> {cartItem.shutter.price} HUF</li>
                                                                        <li><strong>Quantity:</strong> {cartItem.quantity} pcs</li>
                                                                        <li><strong>Height:</strong> {cartItem.parameters.height} cm</li>
                                                                        <li><strong>Width:</strong> {cartItem.parameters.width} cm</li>
                                                                        <li><strong>Slat:</strong> {cartItem.parameters.slat}</li>
                                                                    </ul>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                                <h6 className="text-danger">Total price:  HUF</h6>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="card-footer">
                                <div className="text-danger row"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"/>
                </div>

            </div>
        );
    };
}

export default CustomerOrders;