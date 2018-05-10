/* @flow */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Layout, Home, Navigation, ReduxDemo, Pool } from 'components';
import { asyncLoad } from 'factories';
import 'styles/reset.css';
import 'styles/animation.css';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/redux-demo" component={ReduxDemo} />
        <Route
          path="/about"
          component={asyncLoad({
            importer: () =>
              import(/* webpackChunkName: "About" */ './components/About'),
          })}
        />
        <Route
          path="/contact"
          component={asyncLoad({
            importer: () =>
              import(/* webpackChunkName: "Contact" */ './components/Contact'),
          })}
        />
      </Switch>
      <Navigation />
      <Pool />
    </Layout>
  </BrowserRouter>
);

export default hot(module)(App);
