import React from 'react';
import CustomerActions from '../../actions/CustomerActions';
import CustomerStore from '../../store/CustomerStore';

class ViewOwnOrders extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            userOrders: [],
            username: ""
        };
    }

    _onChange() {
        this.setState({userOrders: CustomerStore._ordersByUsername});
    }

    componentDidMount() {
        CustomerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        CustomerStore.removeChangeListener(this._onChange);
    }

    renderStatus = (status, date) => {
        const installationDate = new Date(date);
        const formattedDate = installationDate.getFullYear()+'-'+installationDate.getMonth()+'-'+installationDate.getDate();
        if(status === 'WAITING_FOR_ASSEMBLE')
            return <h6>Status: Under process.</h6>;
        else if (status === 'ASSEMBLED')
            return <h6>Status: Order was processed. Installation on {formattedDate}.</h6>;
    };


    render() {
        console.log(this.state.userOrders);
        return(
            <div className="top-margin-high">
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
                            onClick={() => CustomerActions.fetchOrdersByUsername(this.state.username)}
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
                                                            <li><strong>Email:</strong> {order.email}</li>
                                                            <li><strong>Address:</strong> {order.address}</li>
                                                            <li><strong>State:</strong> {order.state}</li>
                                                            <li><strong>City:</strong> {order.city}</li>
                                                            <li><strong>Zip:</strong> {order.zip}</li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-sm-6 col-auto">
                                                        <h6>Ordered Shutter(s):</h6>
                                                        {order.cartItems.map(cartItem => {
                                                            return (
                                                                <div key={JSON.stringify(cartItem)} className="mb-3 overflow-auto">
                                                                    <ul style={{listStyleType: 'none'}}>
                                                                        <li><strong>Name:</strong> {cartItem.shutter.name}</li>
                                                                        <li><strong>Part number:</strong> {cartItem.shutter.partNo}</li>
                                                                        <li><strong>Price:</strong> {cartItem.price} HUF</li>
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
                                                <h6 className="text-danger">Total price: {order.price} HUF</h6>
                                                {this.renderStatus(order.status, order.installationDate)}
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

export default ViewOwnOrders;