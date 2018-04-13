import React, { Component } from 'react';
import './NotFound.css';
import PropTypes from 'prop-types';


export class NotFound extends Component {
    goHome() {
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="not-found">
                <div className="not-found-text-wrapper" onClick={() => this.goHome()}>
                    <div> 404 page not found...  <i className="big-text">:(</i>
                    </div>
                    <br />
                    <div className="smaller-text">
                        Click here to go to order overview
                    </div>
                </div>
            </div>
        );
    }
}
NotFound.propTypes = {


    history: PropTypes.object,

};


export default NotFound;