import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from './../List/List';
import PropTypes from 'prop-types';
import { addOrder } from './../../actions/actions';
import Loader from './../../components/Loader/Loader';

import './App.css';

export class App extends Component {

    constructor(props) {
        super(props);
        this.title = 'ORDERBOOK';

    }

    toggleModal() {
        this.showModal = !this.showModal;
        this.forceUpdate();
    }

    addOrder() {
        this.props.addOrder(this.selectCustomer.value);
        this.toggleModal();
    }
    render() {
        return (
            <div>
                {this.props.customers.length > 0 ?
                    <div>
                        < div className={this.showModal ? 'showModal modalBackDrop' : 'modalBackDrop'}
                            onClick={() => {
                                this.showModal = false;
                                this.forceUpdate(); // todo: ??? must be better way than this without keeping boolean in store ???
                                //this.setState({}) // triggers the same as forceUpdate...
                            }}>
                        </div>
                        <div className={this.showModal ? 'showModal modal' : 'modal'}>
                            <div id="modal" className="modal-content add-order-modal">
                                <div className="modal-header">
                                    Add order
                                </div>

                                <div className="modal-body">
                                    Select customer:

                                    <select id="select-customer" ref={(input) => this.selectCustomer = input} >
                                        {this.props.customers.map(c => {
                                            return <option key={c.id} value={c.id}>{c.name}</option>;
                                        })}
                                    </select>
                                </div>

                                <div className="modal-footer">
                                    <button id="cancel-button" onClick={() => this.toggleModal()}>cancel</button>
                                    <button id="ok-button" onClick={() => this.addOrder()} className="primary-button">ok</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    : ''
                }
                <div className="App">


                    <header className="App-header">
                        <div className="halfCol header">
                            {this.title}
                        </div>
                        <div className="halfCol header ">
                            <button id="go-to-help-button" className="pullright header-button" onClick={() => this.props.history.push('/help')}>?</button>
                            <button id="add-order-button" className="pullright header-button" onClick={() => this.toggleModal()}>+</button>
                        </div>
                    </header>
                    {this.props.orders.length === 0 ? <Loader /> :
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
                                {this.props.orders.filter(o => !o.hasBeenPlaced).sort((a, b) => parseInt(a.id, 10) > parseInt(b.id, 10)).map(o => <List className="orderList" key={o.id} order={o} history={this.props.history} />)}



                                {this.props.orders.filter(o => o.hasBeenPlaced).length > 0 ?
                                    <li className="grid-header placed-orders-header">Placed Orders
                                        <hr />
                                    </li> : ''
                                }
                                {this.props.orders.filter(o => o.hasBeenPlaced).sort((a, b) => parseInt(a.id, 10) > parseInt(b.id, 10)).map(o => <List className="orderList placed-order" key={o.id} order={o} history={this.props.history} />)}

                            </ul>

                        </div>
                    }
                </div>
            </div >

        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.data.orders,
        customers: state.data.customers
    };

};


const mapDispatchToProps = (dispatch) => {
    return {
        addOrder: (customerId) => {
            dispatch(addOrder(customerId));
        }
    };
};

App.propTypes = {
    customers: PropTypes.array,
    orders: PropTypes.array,
    history: PropTypes.object,
    addOrder: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
