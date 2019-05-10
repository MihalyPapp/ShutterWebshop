import React from 'react';
import {Link} from 'react-router-dom';
import ShutterActions from '../../actions/ShutterActions';

const ShutterCard = ({shutter}) => {
    const imageLink = `http://localhost:8080/images/${shutter.imgName}.jpg`;

    return (
        <div className="top-margin-high col-sm-6 col-lg-3">
            <Link onClick={() => {ShutterActions.fetchSelectedShutter(shutter._id)}} to={'/shutters/'+shutter._id}>
                <div className="card h-100">
                    <img className="card-img-top img-fluid" src={imageLink} alt="card"/>
                    <div className="card-body">
                        <h6 className="card-title">{shutter.name}</h6>
                    </div>
                    <div className="card-footer">
                        <p className="card-text text-right text-danger">Price: {shutter.price} HUF</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ShutterCard;