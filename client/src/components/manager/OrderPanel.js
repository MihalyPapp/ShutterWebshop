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

    renderList(order) {
        let classname = 'row';

        if(order.status === 'WAITING') {
            classname += ' text-danger';
        } else if (order.status === 'ASSEMBLING') {
            classname += ' text-info';
        } else if (order.status === 'DONE') {
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