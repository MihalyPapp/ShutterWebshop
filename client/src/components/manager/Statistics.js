import React from 'react';
import PieChart from 'react-minimal-pie-chart';

import StatisticsActions from '../../actions/StatisticsActions';
import StatisticsStore from '../../store/StatisticsStore';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        StatisticsActions.fetchSlatsData();
        this._onChange = this._onChange.bind(this);
        this.state = {
            slatsData: Statistics._slatsData,
        };
    }

    _onChange() {
        this.setState({slatsData: StatisticsStore._slatsData});
    }

    componentDidMount() {
        StatisticsStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        StatisticsStore.removeChangeListener(this._onChange);
    }

    render() {
        return(
            <div className="row">
                <div className="col-3"/>
                <div className="col-md-6">
                    <h3 className="">The popularity of the slat types</h3>
                    <PieChart data = {this.state.slatsData}/>
                </div>
                <div className="col-3"/>
            </div>
        )
    }
}

export default Statistics;