import React from 'react';

import WorkerActions from '../../actions/WorkerActions';
import WorkerStore from '../../store/WorkerStore'

class OrderPanel extends React.Component {
    constructor(props) {
        super(props);
        WorkerActions.fetchOrders();
        this._onChange = this._onChange.bind(this);
        this.state = {
            sentUpdateResponse: null,
            orders: WorkerStore._orders,
            username: ""
        };
    }

    _onChange() {
        this.setState({
            orders: WorkerStore._orders,
            sentUpdateResponse: WorkerStore._sentUpdateResponse
        });
    }

    componentDidMount() {
        WorkerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        WorkerStore.removeChangeListener(this._onChange);
    }

    renderResponseMsg() {
        if(this.state.sentUpdateResponse === null) {
            return <div/>
        }
        switch (this.state.sentUpdateResponse.ok) {
            case 1:
                return (
                    <div className="alert alert-success"><strong>Success!</strong> The order has been updated!</div>
                );
            case 0:
                return <div className="alert alert-danger"><strong>Error!</strong> Something wrong.</div>;
            case undefined:
                return <div className="spinner-border"><span className="sr-only">Loading..</span></div>;
            default:
                return <div/>
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">Orders what's waiting for assemble</div>
                {this.renderResponseMsg()}
                <div className="card-body">
                    <ul className="list-group">
                        {this.state.orders.map(order => {
                            return(
                                <li onClick={() => WorkerActions.fetchOrderParameters(order._id)} className="list-group-item" key={order._id}>
                                    <div className="col-auto">
                                        <div className="row text-info">
                                            <small>{order.date}</small>
                                        </div>
                                        <div className="row">
                                            Username: <strong> {order.username}</strong>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default OrderPanel;