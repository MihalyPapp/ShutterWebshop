import React from 'react';

import WorkerStore from '../../store/WorkerStore'
import WorkerActions from "../../actions/WorkerActions";

class ParameterPanel extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            selectedOrderParameters: WorkerStore._selectedOrderParameters
        }
    }

    _onChange() {
        this.setState({selectedOrderParameters: WorkerStore._selectedOrderParameters});
    }

    componentDidMount() {
        WorkerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        WorkerStore.removeChangeListener(this._onChange);
    }

    render() {
        console.log(this.state.selectedOrderParameters)
        return (
            <div className="card">
                <div className="card-header">Parameters</div>
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
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Username:</label>
                        <div className="input-group col-sm-6">
                            <input
                                onChange={(event) => {this.setState({username: event.target.value})}}
                                className="form-control" placeholder="Username" autoComplete="off"
                            />
                        </div>
                        <div className="input-group col-sm-3">
                            <button className="btn btn-success float-none">Send order</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ParameterPanel;