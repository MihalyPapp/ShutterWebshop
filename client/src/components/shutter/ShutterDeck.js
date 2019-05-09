import React from 'react';
import ShutterActions from '../../actions/ShutterActions';
import ShutterStore from '../../store/ShutterStore';
import ShutterCard from './ShutterCard';

class ShutterDeck extends React.Component {
    constructor(props) {
        super(props);
        ShutterActions.fetchShutters();
        this._onChange = this._onChange.bind(this);
        this.state = {
            shutters: ShutterStore._shutters
        };
    }

    _onChange() {
        this.setState({shutters: ShutterStore._shutters});
    }

    componentDidMount() {
        ShutterStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ShutterStore.removeChangeListener(this._onChange);
    }

    renderCard() {
        return (
            this.state.shutters.map(shutter => {
                return <ShutterCard key={shutter._id} shutter={shutter}/>;
            })
        );
    }

    render() {
        return (
            <div className="row">{this.renderCard()}</div>
        );
    }
}

export default ShutterDeck;