import React from 'react';
import './App.scss';
import {BrowserRouter, Route} from "react-router-dom";

import Navbar from './components/Navbar';
import ShutterDeck from './components/shutter/ShutterDeck';
import ShutterDetails from './components/shutter/ShutterDetails';
import CreateOrder from './components/customer/CreateOrder';
import ViewOwnOrders from './components/customer/ViewOwnOrders';
import Worker from './components/worker/Worker';
import Manager from './components/manager/Manager';
import Statistics from './components/manager/Statistics';

function App() {
  return (
    <div className="container">
        <BrowserRouter>
            <Navbar/>
            <Route path="/" exact component={ShutterDeck}/>
            <Route path="/shutters" exact component={ShutterDeck}/>
            <Route path="/shutters/:id" exact component={ShutterDetails}/>
            <Route path="/customer/createOrder" exact component={CreateOrder}/>
            <Route path="/customer/orders" exact component={ViewOwnOrders}/>
            <Route path="/worker" exact component={Worker}/>
            <Route path="/manager" exact component={Manager}/>
            <Route path="/manager/statistics" exact component={Statistics}/>
        </BrowserRouter>
    </div>
  );
}

export default App;
