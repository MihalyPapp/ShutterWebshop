import React from 'react';

import WorkerActions from '../../actions/WorkerActions';
import WorkerStore from '../../store/WorkerStore'

class OrderPanel extends React.Component {
    constructor(props) {
        super(props);
        WorkerActions.fetchOrders();
        this._onChange = this._onChange.bind(this);
        this.state = {
            orders: WorkerStore._orders,
            username: ""
        };
    }

    _onChange() {
        this.setState({orders: WorkerStore._orders,});
    }

    componentDidMount() {
        WorkerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        WorkerStore.removeChangeListener(this._onChange);
    }


    render() {
        return (
            <div className="card">
                <div className="card-header">Orders what's waiting for assemble</div>
                <div className="card-body">
                    <ul className="list-group">
                        {this.state.orders.map(order => {
                            return(
                                <li onClick={() => {WorkerActions.fetchOrderParameters(order._id); WorkerActions.setUpdateSentStatus(0)}} className="list-group-item" key={order._id}>
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