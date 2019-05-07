import React from 'react';
import ShutterStore from "../store/ShutterStore";
import {Link} from "react-router-dom";
import ShoppingCartActions from "../actions/ShoppingCartActions";
import ShoppingCart from "./ShoppingCart";

class ShutterDetails extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            selectedShutter: ShutterStore._selectedShutter
        }
    }

    _onChange() {
        this.setState({selectedShutter: ShutterStore._selectedShutter});
    }

    componentDidMount() {
        ShutterStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        ShutterStore.removeChangeListener(this._onChange)
    }

    formValues = {
        width: 0,
        height: 0,
        slat: ""
    };

    render() {
        console.log(this.state.selectedShutter);
        return(
            <div className="row" style={{marginTop: '15px'}}>
                <div className="col-lg-8 col-auto" style={{marginBottom: '15px'}}>
                    <div className="">
                        <div className="jumbotron">
                            <div className="row">
                                <div className="col-sm-4">
                                    <img className="card-img-top" src="http://placehold.it/200x200" alt="card"/>
                                </div>
                                <div className="col-sm-8">
                                    <h3>{this.state.selectedShutter.name}</h3>
                                    <p className="blockquote-footer text-right">Part number: {this.state.selectedShutter.partNo}</p>
                                    <h6 className="align-text-bottom text-danger">
                                        <label>Price: {this.state.selectedShutter.price} Ft</label>
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="container" style={{marginBottom: '15px'}}>
                            <h4 className="d-flex justify-content-between align-items-center">
                                <span className="text-muted">Window's parameter</span>
                            </h4>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Width:</label>
                                <div className="input-group col-sm-10">
                                    <input
                                        onChange={(event) => {
                                            this.formValues.width = event.target.value;
                                        }}
                                        type="text"
                                        className="form-control"
                                        placeholder="test"
                                        autoComplete="off"/>
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
                                            this.formValues.height = event.target.value;
                                        }}
                                        className="form-control"
                                        placeholder="test"
                                        autoComplete="off"/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">cm</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Slat:</label>
                                <div className="input-group col-sm-10">
                                    <select onChange={event => this.formValues.slat=event.target.value} className="custom-select">
                                        <option defaultValue={null} label=""/>
                                        {this.state.selectedShutter.slats.map(slat => {
                                            return <option key={slat} value={slat}>{slat}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-auto">
                                    <button
                                        onClick={() => this._onClick()}
                                        className="btn btn-primary float-none">Add to cart
                                    </button>
                                    <Link to="/">
                                        <button type="button" className="btn btn-light float-none">Go to shop</button>
                                    </Link>
                                </div>
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

    _onClick = () => {
        const cartItem = {
            shutter: this.state.selectedShutter,
            parameters: this.formValues
        };
        console.log("item componenstol")
        console.log(cartItem)
        ShoppingCartActions.addToShoppingCart(cartItem);
    }
}

export default ShutterDetails;