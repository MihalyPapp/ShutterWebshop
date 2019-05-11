import React from 'react';

import ManagerActions from '../../actions/ManagerActions';
import ManagerStore from '../../store/ManagerStore'

class OrderPanel extends React.Component {
    constructor(props) {
        super(props);
        ManagerActions.fetchOrdersDetails();
        this._onChange = this._onChange.bind(this);
        this.state = {
            ordersDetails: ManagerStore._ordersDetails,
        };
    }

    _onChange() {
        this.setState({ordersDetails: ManagerStore._ordersDetails,});
    }

    componentDidMount() {
        ManagerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ManagerStore.removeChangeListener(this._onChange);
    }

    renderWorkerUsername = (order) => {
        if(order.status === 'WAITING')
            return <div/>;

        return (
            <div className="row">
                <div className="col-auto">
                    Worker:
                </div>
                <div className="col-auto">
                    <strong>{order.workerUsername}</strong>
                </div>
            </div>
        );
    };

    renderStatus(status) {
        if(status === 'WAITING') {
            return 'Waiting for worker'
        } else if (status === 'ASSEMBLED') {
            return 'Order completed'
        }
    }

    renderList(order) {
        let classname = 'row';

        if(order.status === 'WAITING') {
            classname += ' text-danger';
        } else if (order.status === 'ASSEMBLED') {
            classname += ' text-success';
        }

        return (
            <li onClick={() => {ManagerActions.fetchOrder(order._id)}}
            className="list-group-item list-group-item-action pointer"
            key={order._id}>
                <div className="col-auto">
                    <div className={classname}>
                        <small>{order.date}</small>
                    </div>
                    <div className="row">
                        <div className="col-auto">
                            Username:
                        </div>
                        <div className="col-auto">
                            <strong>{order.username}</strong>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto">
                            Status:
                        </div>
                        <div className="col-auto">
                            <strong>{this.renderStatus(order.status)}</strong>
                        </div>
                    </div>
                    {this.renderWorkerUsername(order)}
                </div>
            </li>
        );
    };

    render() {
        return (
            <div className="card">
                <div className="card-header">Orders</div>
                <div className="card-body">
                    <ul className="list-group">
                        {this.state.ordersDetails.map(order => {
                            return this.renderList(order);
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default OrderPanel;