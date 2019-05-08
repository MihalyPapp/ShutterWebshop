import React from 'react';
import {Link} from 'react-router-dom'
import ShoppingCart from './ShoppingCart'
import ShoppingCartStore from '../store/ShoppingCartStore';

class CreateOrder extends React.Component {
    constructor(props) {
        super(props);
        this._onCartChange = this._onCartChange.bind(this);
        this.state = {
            cartItems: ShoppingCartStore._cartItems,
            username: "",
            email: "",
            address: "",
            city: "",
            state: "",
            zip: "",
        };
    }

    _onCartChange() {
        this.setState({
            cartItems: ShoppingCartStore._cartItems,
        });
    }

    componentDidMount() {
        ShoppingCartStore.addChangeListener(this._onCartChange);
    }

    componentWillUnmount() {
        ShoppingCartStore.removeChangeListener(this._onCartChange)
    }

    renderSendOrderBtn() {
        if(this.state.cartItems.length > 0) {
            return <button className="btn btn-success float-none">Send order</button>
        } else {
            return <button className="btn btn-success float-none" disabled>Send order</button>
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
                                <div>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input className="form-control" name="username" placeholder="Username" autoComplete="off"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input className="form-control" name="email" placeholder="Email" autoComplete="off"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input className="form-control" name="address" placeholder="1234 Main St" autoComplete="off"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <div>
                                    <div className="form-group">
                                        <label>City</label>
                                        <input className="form-control" name="city" placeholder="San Francisco" autoComplete="off"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <div>
                                    <div className="form-group">
                                        <label>State</label>
                                        <input className="form-control" name="state" placeholder="California" autoComplete="off"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-2">
                                <div>
                                    <div className="form-group">
                                        <label>Zip</label>
                                        <input className="form-control" name="zip" placeholder="99999" autoComplete="off"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-auto">
                                {this.renderSendOrderBtn()}
                                <Link to="/">
                                    <button type="button" className="btn btn-light float-none">Go to shop</button>
                                </Link>
                            </div>
                        </div>
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