/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'react-emotion';
import { spacing } from 'styles';
import { NAV_LINKS } from 'utils/constants';

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
    <div>
      <Link to={NAV_LINKS.REDUX_DEMO.to}>{NAV_LINKS.REDUX_DEMO.name}</Link>
    </div>
    <div>
      <Link to={NAV_LINKS.CONTEXT_DEMO.to}>{NAV_LINKS.CONTEXT_DEMO.name}</Link>
    </div>
  </div>
);

export default Home;
