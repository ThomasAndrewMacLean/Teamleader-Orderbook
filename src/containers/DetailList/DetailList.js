import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuantity, deleteProduct } from './../../actions/actions';
import Hammer from 'hammerjs';
import './DetailList.css';
import Icon, { ICONS } from './../../components/Icons/Icons';
import PropTypes from 'prop-types';


export class DetailList extends Component {
    constructor(props) {
        super(props);
        this.showDelete = false;
        this.isDeleted = false;
    }
    add(quantity) {
        this.props.addQuantity(quantity, this.props.item['product-id'], this.props.order.id);
        setTimeout(() => this.props.discount(), 100);
    }

    deleteProduct() {
        this.showDelete = !this.showDelete;
        this.isDeleted = !this.isDeleted;
        this.setState({});
        setTimeout(() => this.del(), 300);
    }

    del() {
        this.props.deleteProduct(this.props.item['product-id'], this.props.order.id);
        setTimeout(() => this.props.discount(), 100);
    }

    togglePromptDelete() {
        if (!this.props.order.hasBeenPlaced) {
            this.showDelete = !this.showDelete;

            this.setState({});
        }
    }


    componentDidMount() {
        this.hammer = Hammer(this._slider);
        this.hammer.get('press').set({ time: 500 });
        this.hammer.on('press', () => this.togglePromptDelete());
    }

    render() {
        return (
            <div className={this.isDeleted ? 'detail-deleted detail' : 'detail'} ref={
                (el) => this._slider = el
            }>
                {this.props.item && this.props.products.length > 0 ?
                    <li className={this.showDelete ? 'showDelete deletePrompt' : 'deletePrompt'}>
                        <div>
                            DELETE {this.props.products.find(p => p.id === this.props.item['product-id']).description}?
                        </div>
                        {/* <div className="clear-small"> */}
                        <div className="quatreCol resize-small">
                            <button className="big-button no-button" onClick={() => this.togglePromptDelete()}>NO</button>
                        </div>
                        <div className="quatreCol resize-small">
                            <button className="big-button yes-button" onClick={() => this.deleteProduct()}>YES</button>
                        </div>
                        {/* </div> */}

                    </li> : '...'}
                {this.props.item && this.props.products.length > 0 ?


                    <li className="list-item-detail">
                        <div className="quatreCol resize-small">
                            {this.props.item['product-id']}:{this.props.products.find(p => p.id === this.props.item['product-id']).description}
                        </div>
                        <div className="quatreCol resize-small quantityAndButtons">
                            <div className="buttonwrap">
                                <button className={this.props.order.hasBeenPlaced ? 'round-button orderPlacedHide' : 'round-button'} onClick={() => this.add(-1)}>-</button>
                                <p className="pad">
                                    {this.props.item.quantity}
                                </p>
                                <button className={this.props.order.hasBeenPlaced ? 'round-button orderPlacedHide' : 'round-button'} onClick={() => this.add(1)}>+</button>
                            </div>
                        </div>
                        <div className="clear-small">
                            <div className="quatreCol resize-small">
                                <p className="pullright">
                                    {new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR' }).format(this.props.item['unit-price'])}
                                </p>
                            </div>
                            <div className="quatreCol resize-small">
                                <p className="pullright">
                                    {new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR' }).format(this.props.item.total)}
                                </p>
                            </div>
                        </div>

                        <div className="delete-cross" onClick={() => this.togglePromptDelete()}><Icon icon={ICONS.TRASHCAN} color={getComputedStyle(document.body).getPropertyValue('--color-ruby-darkest')} /></div>
                    </li>
                    : '....'}
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        order: state.data.selectedOrder,
        products: state.data.products,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addQuantity: (name, b, c) => {
            dispatch(addQuantity(name, b, c));
        },
        deleteProduct: (orderId, productId) => {
            dispatch(deleteProduct(orderId, productId));
        }
    };
};


DetailList.propTypes = {
    item: PropTypes.object,
    order: PropTypes.object,
    products: PropTypes.array,

    addQuantity: PropTypes.func,
    deleteProduct: PropTypes.func,
    discount: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailList);
