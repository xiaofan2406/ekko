/* @flow */
import React from 'react';
import { css } from 'react-emotion';
import { NavLink } from 'react-router-dom';
import { theme, spacing } from 'styles';
import { NAV_LINKS } from 'utils/constants';

const cssNavigation = css`
  position: fixed;
  left: ${spacing.unit}px;
  bottom: ${spacing.unit}px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${theme.borderColor};
  & > .link {
    text-decoration: none;
    padding: 0.5em;
    display: inline-block;
    &:hover {
      background-color: ${theme.borderColor};
    }
    &.active {
      border-right: 2px solid ${theme.primaryColor};
    }
  }
`;

const Navigation = () => (
  <div className={cssNavigation}>
    {Object.keys(NAV_LINKS).map(routeName => (
      <NavLink
        className="link"
        activeClassName="active"
        key={NAV_LINKS[routeName].to}
        exact={NAV_LINKS[routeName].exact}
        to={NAV_LINKS[routeName].to}
      >
        {NAV_LINKS[routeName].name}
      </NavLink>
    ))}
  </div>
);

export { Navigation as Component };

export default Navigation;
