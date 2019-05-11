import React from 'react';
import ShutterActions from '../../actions/ShutterActions';
import ShutterStore from '../../store/ShutterStore';
import ShutterCard from './ShutterCard';

class ShutterDeck extends React.Component {
    constructor(props) {
        super(props);
        ShutterActions.fetchShuttersDetails();
        this._onChange = this._onChange.bind(this);
        this.state = {
            shuttersDetails: ShutterStore._shuttersDetails
        };
    }

    _onChange() {
        this.setState({shuttersDetails: ShutterStore._shuttersDetails});
    }

    componentDidMount() {
        ShutterStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ShutterStore.removeChangeListener(this._onChange);
    }

    renderCard() {
        return (
            this.state.shuttersDetails.map(shutter => {
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