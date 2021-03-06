import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSelectedOrder } from './../../actions/actions';
import PropTypes from 'prop-types';

export class OrderList extends Component {
    goToDetail(orderId) {
        this.props.setSelectedOrder(orderId);
        this.props.history.push(`/detail/${orderId}`);
    }
    render() {
        return (
            <div className="Detail">
                {this.props.order && this.props.customers.length > 0
                    ? <li>
                        <div className="quatre-col id-and-name">
                            {this.props.order.id}
                            <p className="username pullright">&nbsp;{(this.props.customers.find(u => parseInt(u.id, 10) === parseInt(this.props.order['customer-id'], 10)) || {
                                name: '?'
                            }).name}</p>
                        </div>
                        <div className="quatre-col textright">
                            {this.props.order.items.reduce((a, b) => a += parseInt(b.quantity, 10), 0)}
                        </div>
                        <div className="quatre-col textright">
                            {new Intl
                                .NumberFormat('nl-BE', {
                                    style: 'currency',
                                    currency: 'EUR'
                                })
                                .format(this.props.order.priceWithDiscount || this.props.order.total)}
                        </div>
                        <div className="quatre-col">
                            <button
                                className="pullright go-to-details-button"
                                onClick={() => this.goToDetail(this.props.order.id)}>DETAILS</button>
                        </div>
                    </li>
                    : '....'}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { customers: state.data.customers };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedOrder: (orderId) => {
            dispatch(setSelectedOrder(orderId));
        }
    };
};

OrderList.propTypes = {
    order: PropTypes.object,
    history: PropTypes.object,
    products: PropTypes.array,
    customers: PropTypes.array,
    setSelectedOrder: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
