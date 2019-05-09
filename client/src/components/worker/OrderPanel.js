import React from 'react';

import WorkerActions from '../../actions/WorkerActions';
import WorkerStore from '../../store/WorkerStore'

class OrderPanel extends React.Component {
    constructor(props) {
        super(props);
        WorkerActions.fetchOrders();
        this._onChange = this._onChange.bind(this);
        this.state = {
            orders: WorkerStore._orders
        };
    }

    _onChange() {
        this.setState({orders: WorkerStore._orders});
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
                <div className="card-header">Stores</div>
                <div className="card-body">
                    <ul className="list-group">
                        {this.state.orders.map(order => {
                            return(
                                <li className="list-group-item" key={order._id}>
                                    <small>{order.date}</small>
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