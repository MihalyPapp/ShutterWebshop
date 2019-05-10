import React from 'react';

import WorkerStore from '../../store/WorkerStore'
import WorkerActions from "../../actions/WorkerActions";

class ParameterPanel extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            selectedOrderParameters: WorkerStore._selectedOrderParameters,
            selectedOrderId: null,
            sentUpdateResponse: {},
            workerUsername: "",
        }
    }

    _onChange() {
        this.setState({
            selectedOrderParameters: WorkerStore._selectedOrderParameters,
            selectedOrderId: WorkerStore._selectedOrderId,
            sentUpdateResponse: WorkerStore._sentUpdateResponse,
        });
    }

    componentDidMount() {
        WorkerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        WorkerStore.removeChangeListener(this._onChange);
    }

    onBtnClick = () => {
        WorkerActions.setUpdateSentStatus(1);
        WorkerActions.updateOrder({_id: this.state.selectedOrderId, workerUsername: this.state.workerUsername})
    };

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
            <div className="card">
                <div className="card-header">Parameters and parts</div>
                <div className="card-body">
                    <ul className="list-group">
                        {this.state.selectedOrderParameters.map(parameter => {
                            return(
                                <li className="list-group-item" key={JSON.stringify(parameter)}>
                                    <div className="col-auto">
                                        <ul>
                                            <li>Shutter's partNo.: <strong>{parameter.partNo}</strong></li>
                                            <li>Width: <strong>{parameter.width}</strong> cm</li>
                                            <li>Height: <strong>{parameter.height}</strong> cm</li>
                                            <li>Slat: <strong>{parameter.slat}</strong></li>
                                            <li>Quantity: <strong>{parameter.quantity}</strong> pcs</li>
                                        </ul>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="row top-margin" style={{paddingLeft: '15px'}}>
                        <label className="col-sm-3-3 col-form-label">Worker username:</label>
                        <div className="col-md-6 col-auto">
                            <input
                                onChange={(event) => {this.setState({workerUsername: event.target.value})}}
                                className="form-control" placeholder="Worker username" autoComplete="off"
                            />
                        </div>
                        <div className="col-md-3 col-auto">
                            <button
                                onClick={() => this.onBtnClick()}
                                className="btn btn-success float-none">Assemble</button>
                        </div>
                    </div>
                    {this.state.updateSent ? this.renderResponseMsg() : ''}
                </div>
            </div>
        );
    }
}

export default ParameterPanel;