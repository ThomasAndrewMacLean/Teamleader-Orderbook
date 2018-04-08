import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailList from './../DetailList/DetailList';
import Loader from './../../components/Loader/Loader';
import './Detail.css';
import { addProduct, placeOrder, reopenOrder, checkForDiscount, setSelectedOrder } from './../../actions/actions';
import Hammer from 'hammerjs';
import PropTypes from 'prop-types';


export class Detail extends Component {
    // order = {}
    // showModal = false;
    addProduct(product) {
        this.toggleModal();
        this.props.addProduct(product, this.props.order.id);
        this.props.checkForDiscount(this.props.order);
    }

    toggleModal() {
        this.showModal = !this.showModal;
        this.forceUpdate();
    }

    getProductsNotOnScreen() {
        let productsOnScreen = this.props.order.items.map(i => i['product-id']);
        return this.props.products.filter(p => !productsOnScreen.includes(p.id));
    }

    goHome() {
        this.props.history.push('/');
    }
    checkForDiscountTest() { this.props.checkForDiscount(this.props.order); }

    componentDidMount() {
        this.hammer = Hammer(this._slider);
        this.hammer.on('swiperight', () => this.goHome());
    }

    placeOrder(id) {
        this.props.placeOrder(id);
        this.props.checkForDiscount(this.props.order);
    }

    componentDidUpdate() {
        if (!this.props.order.id && this.props.orders.length > 0) {

            let id = this.props.match.params.id;
            this.props.setSelectedOrder(id);
        }
    }


    render() {

        return (
            <div ref={
                (el) => this._slider = el
            }>

                <div className={this.showModal ? 'showModal modalBackDrop' : 'modalBackDrop'}
                    onClick={() => {
                        this.showModal = false;
                        this.forceUpdate(); // todo: ??? must be better way than this without keeping boolean in store ???
                        //this.setState({}) // triggers the same as forceUpdate...
                    }}>
                </div>
                {this.props.order.items ?

                    <div className={this.showModal ? 'showModal modal' : 'modal'}>
                        <div id="modal" className="modal-content">
                            {this.getProductsNotOnScreen().map(product => {
                                return <button key={product.id} onClick={() => this.addProduct(product)} className="big-button add-product-list">{product.description}</button>;
                            })}
                            <button id="cancel-button" className="big-button" onClick={() => this.toggleModal()}>CANCEL</button>
                        </div>
                    </div> : ''
                }

                {this.props.order.id && this.props.customers.length > 0 && this.props.products.length > 0 ?
                    <div className="App">
                        <header className="App-header">
                            <div id="back-button" className="quatreCol header pointer" onClick={() => this.goHome()}>
                                BACK
                            </div>
                            <div className="threeQuatreCol header">
                                <p className="pullright detail-header-info">
                                    id: {this.props.order.id} customer: {this.props.customers.find(u => parseInt(u.id, 10) === parseInt(this.props.order['customer-id'], 10)).name}                                    total:<i className={this.props.order.discount ? 'discount marginright' : 'marginright'}> {new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR' }).format(this.props.order.total)}
                                    </i>
                                    {this.props.order.discount ? new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR' }).format(this.props.order.priceWithDiscount) : ''}

                                </p>
                            </div>
                        </header>
                        <ul>
                            <li className="grid-header list-item-detail">
                                <div className="quatreCol resize-small">
                                    product
                                </div>
                                <div className="quatreCol resize-small">
                                    quantity
                                </div>
                                <div className="clear-small">
                                    <div className="quatreCol resize-small">
                                        <p className="pullright">
                                            unitprice
                                        </p>
                                    </div>
                                    <div className="quatreCol resize-small">
                                        <p className="pullright">
                                            total
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <hr />
                            {this.props.order.items.map(o => <DetailList key={o['product-id']} discount={() => this.checkForDiscountTest()} item={o} history={this.props.history} />)}
                        </ul>

                        <div className="halfCol button-padding">
                            <button id="add-product-button" className={this.props.order.hasBeenPlaced ? 'big-button orderPlacedHide' : 'big-button'} onClick={() => this.toggleModal()}>ADD PRODUCT</button>
                        </div>
                        <div className={this.props.order.hasBeenPlaced ? 'halfCol button-padding displaynone' : 'halfCol button-padding'}>
                            <button id="place-order-button" className={this.props.order.hasBeenPlaced ? 'big-button orderPlacedHide primary-button' : 'big-button primary-button'} onClick={() => this.placeOrder(this.props.order.id)}>PLACE ORDER</button>
                        </div>
                        <div className="halfCol button-padding pullright">
                            <button id="reopen-order-button" className={this.props.order.hasBeenPlaced ? 'big-button' : 'orderPlacedHide big-button'} onClick={() => this.props.reopenOrder(this.props.order.id)}>REOPEN ORDER</button>
                        </div>

                    </div>


                    : <Loader />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.data.selectedOrder,
        orders: state.data.orders,
        products: state.data.products,
        customers: state.data.customers
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (product, orderId) => {
            dispatch(addProduct(product, orderId));
        },
        placeOrder: (order) => {
            dispatch(placeOrder(order));
        },
        reopenOrder: (order) => {
            dispatch(reopenOrder(order));
        },
        checkForDiscount: (order) => {
            dispatch(checkForDiscount(order));
        },
        setSelectedOrder: (orderId) => {
            dispatch(setSelectedOrder(orderId));
        }
    };
};



Detail.propTypes = {

    order: PropTypes.object,
    orders: PropTypes.array,
    match: PropTypes.any,
    history: PropTypes.object,
    products: PropTypes.array,
    customers: PropTypes.array,
    placeOrder: PropTypes.func,
    reopenOrder: PropTypes.func,
    addProduct: PropTypes.func,
    checkForDiscount: PropTypes.func,
    setSelectedOrder: PropTypes.func
};



export default connect(mapStateToProps, mapDispatchToProps)(Detail);
