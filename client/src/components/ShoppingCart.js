import React from 'react';
import ShoppingCartStore from "../store/ShoppingCartStore";

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            shoppingCart: ShoppingCartStore._cartItems,
            cartPrice: ShoppingCartStore._cartPrice
        }
    }

    _onChange() {
        this.setState({
            shoppingCart: ShoppingCartStore._cartItems,
            cartPrice: ShoppingCartStore._cartPrice
        });
    }

    componentDidMount() {
        ShoppingCartStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ShoppingCartStore.removeChangeListener(this._onChange);
    }


    render() {
        return (
            <div className="card h-100">
                <div className="card-header">
                    ShoppingCart
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        {this.state.shoppingCart.map((cartItem) => {
                            return (
                                <li onClick={() => this.onClick(cartItem)} key={JSON.stringify(cartItem)} className="list-group-item list-group-item-action" style={{cursor: 'pointer'}}>
                                    <div>{cartItem.shutter.name}</div>
                                    <div className="text-muted">
                                        <ul>
                                            <li>Width: {cartItem.parameters.width}</li>
                                            <li>Height: {cartItem.parameters.height}</li>
                                            <li>Slat: {cartItem.parameters.slat}</li>
                                        </ul>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <span className="badge badge-primary badge-pill">{cartItem.quantity} pieces</span>
                                        </div>
                                        <div className="col-6 text-right">
                                            <b>{cartItem.price} Ft</b>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="card-footer">
                    <div className="text-danger row">
                        <div className="col-6">
                            Total price:
                        </div>
                        <div className="col-6 text-right">
                            <b>{this.state.cartPrice} HUF</b>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default ShoppingCart;