import React from 'react';
import OrderActions from "../actions/OrderActions";
import OrderStore from "../store/OrderStore";

class CustomerOrders extends React.Component {
    constructor(props) {
        super(props);
        OrderActions.fetchOrdersByUsername();
        this._onChange = this._onChange.bind(this);
        this.state = {userOrders: OrderStore._userOrders};
    }

    _onChange() {
        this.setState({userOrders: OrderStore._userOrders});
    }

    componentDidMount() {
        OrderStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        OrderStore.removeChangeListener(this._onChange);
    }

    render() {
        return (
            <div className="row">CustomerOrders</div>
        );
    }
}

export default CustomerOrders;