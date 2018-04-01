/* @flow */
import * as React from 'react';
import { css } from 'react-emotion';
import { Box } from 'nidalee';
import { theme } from 'styles';
import Brand from './Brand';

const cssLayout = css`
  font-family: ${theme.fontFamily};
  font-size: ${theme.fontSize}px;
  color: ${theme.textColor};
  min-height: 100vh;
  & p {
    margin: 0px 0px 1em 0px;
  }
`;

type LayoutProps = {
  children: React.Node,
};

const Layout = (props: LayoutProps) => (
  <Box className={cssLayout} level={1}>
    <Brand />
    <Box className="main">{props.children}</Box>
  </Box>
);

export { Layout as Component };

export default Layout;
