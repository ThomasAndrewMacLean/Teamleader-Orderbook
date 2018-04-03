import React, { Component } from 'react';
import { connect } from "react-redux";

import './Help.css';
import Hammer from 'hammerjs'

class Help extends Component {



    goHome() {
        this.props.history.push(`/`)
    }

    componentDidMount() {
        this.hammer = Hammer(this._slider)
        this.hammer.on('swiperight', () => this.goHome());
    }

    render() {

        return (
            <div className="App" ref={
                (el) => this._slider = el
            }>
                <header className="App-header">
                    <div className="quatreCol header" onClick={() => this.props.history.push(`/`)}>
                        BACK
                    </div>
                    <div className="threeQuatreCol header">
                        <p className="pullright">
                            HELP
                        </p>
                    </div>
                </header>

            </div>
        );
    }
}


export default connect()(Help);
