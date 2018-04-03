import React, { Component } from 'react';
import { connect } from "react-redux";
import DetailList from "./../DetailList/DetailList"
import './Detail.css';
import { addProduct, placeOrder } from './../../actions/actions'
import Hammer from 'hammerjs'

class Detail extends Component {
    order = {}
    showModal = false;
    test(p) {
        console.log(p);
        this.toggleModal();
        this.props.addProduct(p, this.order.id)
    }

    toggleModal() {
        this.showModal = !this.showModal;
        this.forceUpdate()
    }

    addProduct() {
        let productsOnScreen = this.order.items.map(i => i['product-id']);
        let otherProducts = this.props.products.filter(p => !productsOnScreen.includes(p.id));

        this.toggleModal()

        const modal = document.getElementById('modal')
        modal.innerHTML = '';
        otherProducts.forEach(p => {
            let b = document.createElement("button");
            b.innerHTML = p.description;
            b.classList.add('big-button')
            b.addEventListener('click', () => this.test(p))
            modal.appendChild(b);
        })
        let b = document.createElement("button");
        b.innerHTML = 'CANCEL';
        b.classList.add('big-button')
        b.addEventListener('click', () => this.toggleModal())
        modal.appendChild(b);
    }


    goHome() {
        this.props.history.push(`/`)
    }

    componentDidMount() {
        this.hammer = Hammer(this._slider)

        this.hammer.on('swiperight', () => this.goHome());
    }

    render() {
        let id = this.props.match.params.id;
        let arr = Array.from(this.props.orders);
        this.order = arr.find(x => x.id === id);

        return (
            <div ref={
                (el) => this._slider = el
            }>

                <div className={this.showModal ? 'showModal modalBackDrop' : 'modalBackDrop'}
                    onClick={() => {
                        this.showModal = false;
                        this.forceUpdate() // todo: ??? must be better way than this without keeping boolean in store ???
                        //this.setState({}) // triggers the same as forceUpdate...
                    }}>
                </div>
                <div className={this.showModal ? 'showModal modal' : 'modal'}>
                    <div id="modal" className="modal-content">
                        hellooowkes
                    </div>
                </div>

                {this.order && this.props.users.length > 0 && this.props.products.length > 0 ?
                    <div className="App">
                        <header className="App-header">
                            <div className="quatreCol header" onClick={() => this.props.history.push(`/`)}>
                                BACK
                            </div>
                            <div className="threeQuatreCol header">
                                <p className="pullright detail-header-info">
                                    id: {this.order.id} name: {this.props.users.find(u => u.id === parseInt(this.order['customer-id'], 10)).name} total: {new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR' }).format(this.order.total)}
                                </p>
                            </div>
                        </header>
                        <ul>
                            <li className="grid-header">
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
                            {this.order.items.map(o => <DetailList key={o['product-id']} parentId={id} item={o} history={this.props.history} />)}
                        </ul>
                        {/* <hr /> */}
                        <div className="halfCol">
                            <button className="big-button" onClick={() => this.addProduct()}>ADD PRODUCT</button>
                        </div>
                        <div className="halfCol">
                            <button className="big-button primary-button" onClick={() => this.props.placeOrder(this.order.id)}>PLACE ORDER</button>
                        </div>


                    </div>


                    : '...loading'}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        products: state.orders.products,
        users: state.orders.users
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (product, orderId) => {
            dispatch(addProduct(product, orderId));
        },
        placeOrder: (order) => {
            dispatch(placeOrder(order));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
