import React from 'react';

import ManagerStore from '../../store/ManagerStore'
import ManagerActions from '../../actions/ManagerActions';

class ParameterPanel extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            selectedOrderParameters: ManagerStore._selectedOrderParameters,
            selectedOrderId: null,
            sentUpdateResponse: {},
        }
    }

    _onChange() {
        this.setState({
            selectedOrderParameters: ManagerStore._selectedOrderParameters,
            selectedOrderId: ManagerStore._selectedOrderId,
            sentUpdateResponse: ManagerStore._sentUpdateResponse,
        });
    }

    componentDidMount() {
        ManagerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ManagerStore.removeChangeListener(this._onChange);
    }

    onBtnClick = () => {
        ManagerStore.setSentStatus(1);
        ManagerStore.updateOrder({_id: this.state.selectedOrderId, workerUsername: this.state.workerUsername})
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
                </div>
            </div>
        );
    }
}

export default ParameterPanel;