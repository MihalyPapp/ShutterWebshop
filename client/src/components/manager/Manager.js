import React from 'react';
import OrderPanel from './OrderPanel';

class Manager extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <OrderPanel/>
                </div>
                <div className="col-md-1">

                </div>
                <div className="col-md-7" id="managerContentPanel"/>
            </div>
        );
    }
}

export default Manager;