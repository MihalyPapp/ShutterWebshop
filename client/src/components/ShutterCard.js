import React from 'react';
import {Link} from 'react-router-dom';
import ShutterActions from "../actions/ShutterActions";

const ShutterCard = ({shutter}) => {
    return (
        <div className="col-sm-6 col-lg-3 py-2">
            <Link onClick={() => {ShutterActions.setSelectedShutter(shutter)}} to={'/shutters/'+shutter._id}>
                <div className="card h-100" style={{cursor: 'pointer'}}>
                    <img className="card-img-top img-fluid" src="http://placehold.it/200x200" alt="card"/>
                    <div className="card-body">
                        <h6 className="card-title">{shutter.name}</h6>
                    </div>
                    <div className="card-footer">
                        <p className="card-text text-right text-danger">Ára: {shutter.price} Ft</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ShutterCard;