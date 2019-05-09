import React from 'react';
import './App.scss';
import {BrowserRouter, Route} from "react-router-dom";

import Navbar from './components/Navbar';
import ShutterDeck from './components/ShutterDeck';
import ShutterDetails from './components/ShutterDetails';
import CreateOrder from './components/CreateOrder';
import CustomerOrders from './components/CustomerOrders';
import Worker from './components/worker/Worker';

function App() {
  return (
    <div className="container">
        <BrowserRouter>
        <Navbar/>
        <Route path="/" exact component={ShutterDeck}/>
        <Route path="/shutters" exact component={ShutterDeck}/>
        <Route path="/shutters/:id" exact component={ShutterDetails}/>
        <Route path="/customer/createOrder" exact component={CreateOrder}/>
        <Route path="/customer/orders" exact component={CustomerOrders}/>
        <Route path="/worker" exact component={Worker}/>
        </BrowserRouter>
    </div>
  );
}

export default App;
