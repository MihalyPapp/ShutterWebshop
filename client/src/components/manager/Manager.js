import React from 'react';
import OrderPanel from './OrderPanel';

class Manager extends React.Component {
    render() {
        return (
            <div className="row top-margin-high">
                <div className="col-md-4">
                    <OrderPanel/>
                </div>
                <div className="col-md-8" id="managerContentPanel"/>
            </div>
        );
    }
}

export default Manager;