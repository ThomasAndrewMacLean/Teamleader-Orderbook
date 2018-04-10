import React, { Component } from 'react';
import './Toaster.css';
import { connect } from 'react-redux';
import { clearToast } from './../../actions/actions';
import PropTypes from 'prop-types';

export class Toaster extends Component {

    componentDidMount() {
        if (this.props.toast.msg) {
            setTimeout(() => this.props.clearToast(), 3000);
        }

    }

    render() {
        return (
            <div onClick={() => this.props.clearToast()} className={this.props.toast.msg ? 'show-toast toast' : 'hide-toast toast'}>
                <div className={this.props.toast.type + ' toast-msg'}>
                    {this.props.toast.msg}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        toast: state.data.toast,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearToast: () => {
            dispatch(clearToast());
        }
    };
};

Toaster.propTypes = {
    toast: PropTypes.object,
    clearToast: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Toaster);
