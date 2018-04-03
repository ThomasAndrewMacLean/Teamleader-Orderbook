import React, { Component } from 'react';
import { connect } from "react-redux";


class List extends Component {
    goToDetail(orderId) {
        //debugger;
        //this.props.dispatch(push(`/about`))
        this.props.history.push(`/detail/${orderId}`)
    }
    render() {
        return (
            <div className="Detail">
                {this.props.order && this.props.users.length > 0 ?
                    <li>
                        <div className="quatreCol">
                            id:{this.props.order.id}
                            <p className="username pullright">{
                                this.props.users.find(u => u.id == this.props.order['customer-id']).name}</p>
                        </div>
                        <div className="quatreCol textright">
                            items:{this.props.order.items.length}
                        </div>
                        <div className="quatreCol textright">
                            total: {new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR' }).format(this.props.order.total)}
                        </div>
                        <div className="quatreCol">
                            <button className="pullright" onClick={() => this.goToDetail(this.props.order.id)}>DETAILS</button>
                        </div>
                    </li>
                    : '....'}
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    return {
        users: state.orders.users
    }
}

export default connect(mapStateToProps)(List);
