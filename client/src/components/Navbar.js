import React from 'react';
import {Link} from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return (
            <div className="w-100">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand">ShutterWebshop</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle pointer" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Customer
                                </div>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown" id="navbarDropdown">
                                    <Link to="/" className="dropdown-item" >Shop</Link>
                                    <div className="dropdown-divider"/>
                                    <Link to="/customer/createOrder" className="dropdown-item" >Create order</Link>
                                    <Link to="/customer/orders" className="dropdown-item" >View Own Orders</Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link to="/worker" className="nav-link">Worker</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle pointer" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Manager
                                </div>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link to="/manager" className="dropdown-item">Orders & invoice</Link>
                                    <div className="dropdown-divider"/>
                                    <Link to="/manager/statistics" className="dropdown-item">Statistics</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    };
}

export default Navbar;
