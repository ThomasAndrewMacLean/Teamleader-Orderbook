import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from './../List/List';
import PropTypes from 'prop-types';


import './App.css';

class App extends Component {
    // static propTypes = {
    //   orders: PropTypes.any
    // }

    constructor(props) {
        super(props);
        this.test = 'ORDERBOOK';
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="halfCol header">
                        {this.test}
                    </div>
                    <div className="halfCol header ">
                        <button className="pullright help-button" onClick={() => this.props.history.push('/help')}>?</button>
                    </div>
                </header>
                {this.props.orders.length === 0 ? 'loading...' :
                    <div>
                        <ul className="list">

                            <li className="grid-header">
                                <div className="quatreCol id-and-name">
                  id
                                    <p className="username pullright">
                    customer
                                    </p>
                                </div>
                                <div className="quatreCol textright">
                  # items
                                </div>
                                <div className="quatreCol textright">
                  total
                                </div>
                                <div className="quatreCol">
                                </div>
                            </li>
                            <hr />

                            {this.props.orders.map(o => <List className="orderList" key={o.id} order={o} history={this.props.history} />)}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders
    };

};

App.propTypes = {

    orders: PropTypes.any,
    history: PropTypes.array
};


export default connect(mapStateToProps)(App);
