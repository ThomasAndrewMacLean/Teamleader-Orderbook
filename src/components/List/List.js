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
                {this.props.order ?
                    <li>
                        <div className="quatreCol">
                            id:{this.props.order.id}
                        </div>
                        <div className="quatreCol">
                            items:{this.props.order.items.length}
                        </div>
                        <div className="quatreCol">
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
        orders: state.orders,
    }
}

export default connect(mapStateToProps)(List);
