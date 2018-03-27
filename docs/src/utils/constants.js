/* @flow */
export const APP_TITLE = 'Ekko';

type NavLinkName = 'HOME' | 'ABOUT' | 'CONTACT';
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
  ABOUT: {
    to: '/about',
    name: 'About',
  },
  CONTACT: {
    to: '/contact',
    name: 'Contact',
  },
};
