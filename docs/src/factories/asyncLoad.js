/* @flow */
import * as React from 'react';

type AsyncLoadState = {
  Component: React.ComponentType<any> | null,
};

type AsyncLoadOptions = {
  importer: () => Promise<{ default: React.ComponentType<any> }>,
};

const asyncLoad = ({ importer }: AsyncLoadOptions): React.ComponentType<any> =>
  class AsyncLoad extends React.Component<{}, AsyncLoadState> {
    state = {
      Component: null,
    };

    componentWillMount() {
      importer()
        .then(({ default: Component }) => {
          this.setState({ Component });
        })
        .catch(console.error);
    }

    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  };

export default asyncLoad;
