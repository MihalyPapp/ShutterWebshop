import React from 'react';
import {PDFDownloadLink} from '@react-pdf/renderer';

import InvoiceDoc from './InvoiceDoc';
import ManagerStore from '../../store/ManagerStore'
//import ManagerActions from '../../actions/ManagerActions';

class ParameterPanel extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            order: ManagerStore._order,
        }
    }

    _onChange() {
        this.setState({
            order: ManagerStore._order,
        });
    }

    componentDidMount() {
        ManagerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ManagerStore.removeChangeListener(this._onChange);
    }

    onBtnClick = () => {
        //ManagerStore.updateOrder({_id: this.state.selectedOrderId, workerUsername: this.state.workerUsername})
        console.log("click")
    };

    formatDate(date) {
        const installationDate = new Date(date);
        const formattedDate = installationDate.getFullYear()+'-'+installationDate.getMonth()+'-'+installationDate.getDate()+' '+installationDate.getHours()+':'+installationDate.getMinutes();
        return(formattedDate);
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">Order info</div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        {this.state.order.map(order => {
                            return(
                                <li key={order._id} className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm-6 col-auto">
                                            <h6>{order.date}</h6>
                                            <ul style={{listStyleType: 'none'}}>
                                                <li><strong>ID:</strong> {order._id}</li>
                                                <li><strong>Username:</strong> {order.username}</li>
                                                <li><strong>Email:</strong> {order.email}</li>
                                                <li><strong>Address:</strong> {order.address}</li>
                                                <li><strong>State:</strong> {order.state}</li>
                                                <li><strong>City:</strong> {order.city}</li>
                                                <li><strong>Zip:</strong> {order.zip}</li>
                                                <li><strong>Installation date:</strong> {this.formatDate(order.date)}</li>
                                            </ul>
                                        </div>
                                        <div className="col-sm-6 col-auto">
                                            <h6>Ordered Shutter(s):</h6>
                                            {order.cartItems.map(cartItem => {
                                                return (
                                                    <div key={JSON.stringify(cartItem)} className="mb-3 overflow-auto">
                                                        <ul style={{listStyleType: 'none'}}>
                                                            <li><strong>Name:</strong> {cartItem.shutter.name}</li>
                                                            <li><strong>Part number:</strong> {cartItem.shutter.partNo}</li>
                                                            <li><strong>Price:</strong> {cartItem.price} HUF</li>
                                                            <li><strong>Quantity:</strong> {cartItem.quantity} pcs</li>
                                                            <li><strong>Height:</strong> {cartItem.parameters.height} cm</li>
                                                            <li><strong>Width:</strong> {cartItem.parameters.width} cm</li>
                                                            <li><strong>Slat:</strong> {cartItem.parameters.slat}</li>
                                                        </ul>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <h6 className="text-danger top-margin">Total price: {this.state.order[0].price} HUF</h6>
                                    <PDFDownloadLink document={<InvoiceDoc order={this.state.order[0]}/>} filename="invoice.pdf">
                                        {({blob, url, loading, error}) => (loading ? 'Loading document...' : 'Download the invoice!')}
                                    </PDFDownloadLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ParameterPanel;