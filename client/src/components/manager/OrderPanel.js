import React from 'react';

import ManagerActions from '../../actions/ManagerActions';
import ManagerStore from '../../store/ManagerStore'

class OrderPanel extends React.Component {
    constructor(props) {
        super(props);
        ManagerActions.fetchOrders();
        this._onChange = this._onChange.bind(this);
        this.state = {
            orders: ManagerStore._orders,
        };
    }

    _onChange() {
        this.setState({orders: ManagerStore._orders,});
    }

    componentDidMount() {
        ManagerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ManagerStore.removeChangeListener(this._onChange);
    }


    render() {
        return (
            <div className="card">
                <div className="card-header">Orders</div>
                <div className="card-body">
                    <ul className="list-group">

                    </ul>
                </div>
            </div>
        );
    }
}

export default OrderPanel;