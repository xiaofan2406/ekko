/* @flow */
import React from 'react';
import { css } from 'react-emotion';
import { spacing } from 'styles';
import ekko from 'ekko';

const cssHome = css`
  & > .title {
    font-size: 48px;
    text-align: center;
    margin-bottom: ${spacing.breath}px;
  }
`;

const Home = () => (
  <div className={cssHome}>
    <div className="title">Hello world!</div>
    <h2>{ekko}</h2>
  </div>
);

export default Home;
