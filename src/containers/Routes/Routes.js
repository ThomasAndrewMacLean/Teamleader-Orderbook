
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import Orders from './../Orders/Orders';
import Detail from './../Detail/Detail';
import Help from './../Help/Help';
import Toaster from './../../components/Toaster/Toaster';
import NotFound from './../../components/NotFound/NotFound';


export class Routes extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Orders} />
                    <Route path="/detail/:id" component={Detail} />
                    <Route path="/help" component={Help} />
                    <Route component={NotFound} />
                </Switch>
                <Toaster />
            </div>
        );
    }
}

export default Routes;