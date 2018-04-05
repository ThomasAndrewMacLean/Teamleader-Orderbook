import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuantity, deleteProduct } from './../../actions/actions';
import Hammer from 'hammerjs';
import './DetailList.css';
import PropTypes from 'prop-types';


class DetailList extends Component {
    constructor(props) {
        super(props);
        this.showDelete = false;
    }
    add(quantity) {
        this.props.addQuantity(quantity, this.props.item['product-id'], this.props.parentId);
    }

    deleteProduct() {
        this.props.deleteProduct(this.props.item['product-id'], this.props.parentId);
    }

    togglePromptDelete() {
        // this.props.item['product-id']

        this.showDelete = !this.showDelete;
        this.setState({});

    }

    // moveOver() {
    //     console.log(this.hammer);

    // }

    componentDidMount() {
        this.hammer = Hammer(this._slider);
        this.hammer.get('press').set({ time: 500 });
        this.hammer.on('press', () => this.togglePromptDelete());
        //this.hammer.on('swipeleft', () => this.moveOver());
    }

    render() {
        return (
            <div className="Detail" ref={
                (el) => this._slider = el
            }>
                {this.props.item && this.props.products.length > 0 ?
                    <li className={this.showDelete ? 'showDelete deletePrompt' : 'deletePrompt'}>

                        DELETE {this.props.products.find(p => p.id === this.props.item['product-id']).description}?
                        <div className="clear-small">
                            <div className="quatreCol resize-small">
                                <button className="big-button" onClick={() => this.togglePromptDelete()}>NO</button>
                            </div>
                            <div className="quatreCol resize-small">
                                <button className="big-button" onClick={() => this.deleteProduct()}>YES</button>
                            </div>
                        </div>

                    </li> : '...'}
                {this.props.item && this.props.products.length > 0 ?


                    <li>
                        <div className="quatreCol resize-small">
                            {this.props.item['product-id']}:{this.props.products.find(p => p.id === this.props.item['product-id']).description}
                        </div>
                        <div className="quatreCol resize-small quantityAndButtons">
                            <button className="round-button" onClick={() => this.add(-1)}>-</button>
                            <p className="pad">
                                {this.props.item.quantity}
                            </p>
                            <button className="round-button" onClick={() => this.add(1)}>+</button>
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
                    </li>
                    : '....'}
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        products: state.orders.products,
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
    parentId: PropTypes.any,
    products: PropTypes.array,

    addQuantity: PropTypes.func,
    deleteProduct: PropTypes.func,

};

export default connect(mapStateToProps, mapDispatchToProps)(DetailList);
