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