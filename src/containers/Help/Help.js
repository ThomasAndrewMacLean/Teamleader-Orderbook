import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Help.css';
import Hammer from 'hammerjs';
import PropTypes from 'prop-types';


export class Help extends Component {



    goHome() {
        this.props.history.push('/');
    }

    componentDidMount() {
        this.hammer = Hammer(this._slider);
        this.hammer.on('swiperight', () => this.goHome());
    }

    render() {

        return (
            <div className="App" ref={
                (el) => this._slider = el
            }>
                <header className="App-header">
                    <div id="back-button" className="quatre-col header" onClick={() => this.goHome()}>
                        BACK
                    </div>
                    <div className="three-quatre-col header">
                        <p className="pullright">
                            HELP
                        </p>
                    </div>
                </header>

                <ul className="info-list">
                    <li>
                        Click on details to see the individual products of an order.
                    </li>
                    <li>
                        On mobile you can delete a product by pressing on it. Not-mobile devices will see a cross on hover. Both will still first ask for confirmation.
                    </li>
                    <li>
                        On every change the price is checked to see if you get any discounts.
                    </li>
                    <li>
                        You can swipe back to the main overview by swiping from left to right.
                    </li>
                    <li>
                        Extra orders can be placed by clicking on the + button on the order overview page.
                    </li>
                    <li>
                        As long as an order has not been placed you can add extra products. Click the button at the bottom left to choose an extra product. By default one will be added.
                    </li>

                </ul>

            </div>
        );
    }
}


Help.propTypes = {
    history: PropTypes.object
};


export default connect()(Help);
