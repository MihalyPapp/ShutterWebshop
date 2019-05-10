import React from 'react';
import ShutterStore from '../../store/ShutterStore';
import {Link} from 'react-router-dom';
import ShoppingCart from '../ShoppingCart';
import ShoppingCartActions from '../../actions/ShoppingCartActions'
import ShoppingCartStore from '../../store/ShoppingCartStore';

class ShutterDetails extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this._onCartChange = this._onCartChange.bind(this);
        this.state = {
            selectedShutter: {
                name: "",
                price: "",
                partNo: "",
                slats: [],
                imgName: "01"
            },
            shoppingCart: ShoppingCartStore._cartItems,
            width: "",
            height: "",
            slat: ""
        };
    }

    _onChange() {
        this.setState({
            selectedShutter: ShutterStore._selectedShutter
        });
    }

    _onCartChange() {
        this.setState({
            shoppingCart: ShoppingCartStore._cartItems
        });
    }

    componentDidMount() {
        ShutterStore.addChangeListener(this._onChange);
        ShoppingCartStore.addChangeListener(this._onCartChange);
    }

    componentWillUnmount() {
        ShutterStore.removeChangeListener(this._onChange);
        ShoppingCartStore.removeChangeListener(this._onCartChange)
    }

    onAddBtnClick = () => {
        const cartItem = {
            shutter: this.state.selectedShutter,
            parameters: {
                width: this.state.width,
                height: this.state.height,
                slat: this.state.slat
            }
        };
        ShoppingCartActions.addToShoppingCart(cartItem);
    };

    renderCreateOrderBtn() {
        if(this.state.shoppingCart.length > 0) {
            return (
                <div className="col">
                    <Link to="/customer/createOrder">
                        <button type="button" className="btn btn-success float-right">Create order</button>
                    </Link>
                </div>
            )
        }
    };

    render() {
        const imageLink = `http://localhost:8080/images/${this.state.selectedShutter.imgName}.jpg`;
        return(
            <div className="row top-margin-high">
                <div className="col-lg-8 col-auto bottom-margin">
                    <div className="">
                        <div className="jumbotron">
                            <div className="row">
                                <div className="col-sm-4">
                                    <img className="card-img-top" src={imageLink} alt="card"/>
                                </div>
                                <div className="col-sm-8">
                                    <h3>{this.state.selectedShutter.name}</h3>
                                    <p className="blockquote-footer text-right">Part number: {this.state.selectedShutter.partNo}</p>
                                    <h6 className="align-text-bottom text-danger">
                                        <label>Price: <strong>{this.state.selectedShutter.price} HUF</strong></label> / sqm
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="container bottom-margin-high">
                            <h4 className="d-flex justify-content-between align-items-center bottom-margin-high">
                                <span className="text-muted">Window's parameters:</span>
                            </h4>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Width:</label>
                                <div className="input-group col-sm-10">
                                    <input
                                        onChange={(event) => {
                                            this.setState({width: event.target.value});
                                        }}
                                        type="number" className="form-control" placeholder="width" autoComplete="off"
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text">cm</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Height:</label>
                                <div className="input-group col-sm-10">
                                    <input
                                        onChange={(event) => {
                                            this.setState({height: event.target.value})
                                        }}
                                        type="number" className="form-control" placeholder="height" autoComplete="off"
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text">cm</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Slat:</label>
                                <div className="input-group col-sm-10">
                                    <select onChange={event => this.setState({slat: event.target.value})} className="custom-select">
                                        <option defaultValue={null} label=""/>
                                        {this.state.selectedShutter.slats.map(slat => {
                                            return <option key={slat} value={slat}>{slat}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="row top-margin-high">
                                <div className="col-auto">
                                    <button
                                        onClick={() => this.onAddBtnClick()}
                                        className="btn btn-primary float-none">Add to cart
                                    </button>
                                    <Link to="/">
                                        <button type="button" className="btn btn-light float-none">Go to shop</button>
                                    </Link>
                                </div>
                                {this.renderCreateOrderBtn()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-auto w-100">
                    <ShoppingCart/>
                </div>
            </div>
        );
    }
}

export default ShutterDetails;