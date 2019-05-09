import React from 'react';
import OrderPanel from './OrderPanel';

class Worker extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <OrderPanel/>
                </div>
                <div className="col-md-1">

                </div>
                <div className="col-md-7">

                </div>
            </div>
        );
    }
}

export default Worker;