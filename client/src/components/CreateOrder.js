import React from 'react';
import {Link} from 'react-router-dom'

import ShoppingCart from './ShoppingCart'
import ShoppingCartStore from '../store/ShoppingCartStore';

import OrderActions from '../actions/CustomerActions'
import CustomerStore from '../store/CustomerStore';

class CreateOrder extends React.Component {
    constructor(props) {
        super(props);
        this._onCartChange = this._onCartChange.bind(this);
        this._onOrderChange = this._onOrderChange.bind(this);
        this.state = {
            cartItems: ShoppingCartStore._cartItems,
            cartPrice: ShoppingCartStore._cartPrice,
            username: "",
            email: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            orderSent: 0, //1 or 0
            sentOrderResponse: CustomerStore._sentOrderResponse
        };
    }

    _onCartChange() {
        this.setState({
            cartItems: ShoppingCartStore._cartItems,
            cartPrice: ShoppingCartStore._cartPrice
        });
    }

    _onOrderChange() {
        this.setState({sentOrderResponse: CustomerStore._sentOrderResponse});
    }

    componentDidMount() {
        ShoppingCartStore.addChangeListener(this._onCartChange);
        CustomerStore.addChangeListener(this._onOrderChange);
    }

    componentWillUnmount() {
        ShoppingCartStore.removeChangeListener(this._onCartChange);
        CustomerStore.removeChangeListener(this._onOrderChange);
    }

    onSendBtnClick = () => {
        const orderItem = {
            cartItems: this.state.cartItems,
            infos: {
                username: this.state.username,
                email: this.state.email,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip
            },
            price: this.state.cartPrice
        };
        OrderActions.sendOrder(orderItem);
        this.setState({orderSent: 1});
        this.renderResponseMsg();
    };

    renderSendOrderBtn() {
        if(this.state.cartItems.length > 0) {
            return (
                <button
                    onClick={() => this.onSendBtnClick()}
                    className="btn btn-success float-none">Send order</button>
            );
        } else {
            return <button className="btn btn-success float-none" disabled>Send order</button>
        }
    }

    renderResponseMsg() {
        if(this.state.orderSent === 0) {
            return <div/>
        }
        switch (this.state.sentOrderResponse.ok) {
            case 1:
                return <div className="alert alert-success"><strong>Success!</strong> The order has been recorded!</div>;
            case 0:
                return <div className="alert alert-danger"><strong>Error!</strong> Something wrong.</div>;
            case undefined:
                return <div className="spinner-border"><span className="sr-only">Loading..</span></div>;
            default:
                return <div/>
        }
    }

    render() {
        return(
            <div>
                <div className="row" style={{marginTop: '15px'}}>
                    <div className="col-lg-8 col-auto" style={{marginBottom: '15px'}}>
                        <h4 className="d-flex justify-content-between align-items-center">
                            <span className="text-muted">Create Order</span>
                        </h4>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        onChange={event => this.setState({username: event.target.value})}
                                        className="form-control" placeholder="Username" autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        onChange={event => this.setState({email: event.target.value})}
                                        className="form-control" placeholder="Email" autoComplete="off"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                onChange={event => this.setState({address: event.target.value})}
                                className="form-control" placeholder="1234 Main St" autoComplete="off"
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <div>
                                    <div className="form-group">
                                        <label>City</label>
                                        <input
                                            onChange={event => this.setState({city: event.target.value})}
                                            className="form-control" placeholder="San Francisco" autoComplete="off"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <div>
                                    <div className="form-group">
                                        <label>State</label>
                                        <input
                                            onChange={event => this.setState({state: event.target.value})}
                                            className="form-control" name="state" placeholder="California" autoComplete="off"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-2">
                                <div>
                                    <div className="form-group">
                                        <label>Zip</label>
                                        <input
                                            onChange={event => this.setState({zip: event.target.value})}
                                            className="form-control" name="zip" placeholder="99999" autoComplete="off"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-auto">
                                {this.renderSendOrderBtn()}
                                <Link to="/">
                                    <button type="button" className="btn btn-light float-none">Go to shop</button>
                                </Link>
                            </div>
                        </div>
                            {this.state.orderSent === 1 ? this.renderResponseMsg() : ""}
                    </div>
                    <div className="col-lg-4 col-auto w-100">
                        <ShoppingCart/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateOrder;