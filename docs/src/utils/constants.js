/* @flow */
export const APP_TITLE = 'Ekko';

type NavLinkName = 'HOME' | 'ABOUT' | 'CONTACT' | 'REDUX_DEMO' | 'CONTEXT_DEMO';
type NavLinkConfig = {
  to: string,
  name: string,
  exact?: boolean,
};
export const NAV_LINKS: { [key: NavLinkName]: NavLinkConfig } = {
  HOME: {
    to: '/',
    name: 'Home',
    exact: true,
  },
  REDUX_DEMO: {
    to: '/redux-demo',
    name: 'Redux Demo',
  },
  CONTEXT_DEMO: {
    to: '/context-demo',
    name: 'Context Demo',
  },
  ABOUT: {
    to: '/about',
    name: 'About',
  },
  CONTACT: {
    to: '/contact',
    name: 'Contact',
  },
};
