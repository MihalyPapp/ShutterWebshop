import React from 'react';

import WrokerActions from '../../actions/WorkerActions';

class WorkerListOrdersPanel extends React.Component {
    /*constructor(props) {
        super(props);
        WrokerActions.fetchOrders();
        this._onChange = this._onChange.bind(this);
        this.state = {orders: WorkerStore._orders};
    }

    _onChange() {
        this.setState({orders: WorkerStore._orders});
    }

    componentDidMount() {
        WorkerStore.addChangeListener(this._onChange());
    }

    componentWillUnmount() {
        MovieStore.removeChangeListener(this._onChange());
    }*/

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <ul className="list-group">

                    </ul>
                </div>
            </div>
        );
    }
}

export default WorkerListOrdersPanel;