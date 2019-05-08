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
                                <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Customer
                                </div>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link to="/" className="dropdown-item" >Shop</Link>
                                    <div className="dropdown-item" >Create order</div>
                                    <div className="dropdown-divider"/>
                                    <div className="dropdown-item" >View Own Orders</div>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Worker
                                </div>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <div className="dropdown-item" >List Orders</div>
                                    <div className="dropdown-item" >Select Job (Shutter)</div>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Manager
                                </div>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <div className="dropdown-item">List Orders & Jobs</div>
                                    <div className="dropdown-item">Organize Installation</div>
                                    <div className="dropdown-divider"/>
                                    <div className="dropdown-item">Check Statistics</div>
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
