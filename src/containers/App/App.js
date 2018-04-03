import React, { Component } from 'react';
import { connect } from "react-redux";
import List from './../../components/List/List'

import './App.css';

class App extends Component {
  test = 'ORDERBOOK'

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="halfCol">
            {this.test}
          </div>
        </header>
        {this.props.orders.length === 0 ? 'loading...' :
          <div>
            <ul className="list">
              {this.props.orders.map(o => <List key={o.id} order={o} history={this.props.history} />)}
            </ul>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  //debugger;

  return {
    orders: state.orders.orders
  }

}

export default connect(mapStateToProps)(App);
