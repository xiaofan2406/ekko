/* @flow */
import * as React from 'react';

type StaticProps = {
  children: React.Node,
};

// render props would return a new component
// wrapped it in this, so it doesnt change
// the update trigger will depends on the enhancer
class Static extends React.Component<StaticProps> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return this.props.children;
  }
}

export default Static;
