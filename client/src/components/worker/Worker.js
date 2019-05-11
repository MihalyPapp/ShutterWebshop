import React from 'react';
import OrderPanel from './OrderPanel';
import WorkerStore from "../../store/WorkerStore";
import WorkerActions from "../../actions/WorkerActions";

class Worker extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            sentUpdateResponse: {},
            sentUpdateStatus: 0
        }
    }

    _onChange() {
        this.setState({
            sentUpdateResponse: WorkerStore._sentUpdateResponse,
            sentUpdateStatus: WorkerStore._sentUpdateStatus
        });
    }

    componentDidMount() {
        WorkerActions.setSentStatus(0);
        WorkerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        WorkerStore.removeChangeListener(this._onChange);
    }

    renderResponseMsg() {
        if(this.state.sentUpdateResponse === null) {
            return <div/>
        }
        if(this.state.sentUpdateResponse.ok === 1) {
            return <div className="alert alert-success"><strong>Success!</strong> The order has been updated!</div>;
        } else if(this.state.sentUpdateResponse.ok === 0) {
            return <div className="alert alert-danger"><strong>Error!</strong> Something wrong.</div>;
        } else {
            return <div className="spinner-border"><span className="sr-only">Loading..</span></div>;
        }
    }

    render() {
        return (
            <div className="row top-margin-high">
                <div className="col-md-4">
                    {this.state.sentUpdateStatus === 1 ? this.renderResponseMsg() : ''}
                    <OrderPanel/>
                </div>
                <div className="col-md-8" id="workerContentPanel">
                </div>
            </div>
        );
    }
}

export default Worker;