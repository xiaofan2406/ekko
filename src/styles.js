import { css } from 'react-emotion';

export const cssCell = css`
  padding: 6px;
  margin: 0;
  cursor: default;
  outline: none;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus,
  &:focus-within {
    border-color: grey;
  }

  &.sortable {
    cursor: pointer;
  }
`;

export const cssCellValue = css`
  outline: none;

  /* expander reset*/
  border: 0 !important;
  background-color: transparent !important;
`;

export const cssCellMenu = css`
  position: fixed;
  z-index: 10;
  background-color: #434343;
`;

export const cssGrid = css`
  display: grid;
  background-color: #232323;
  color: #ffffff;
`;
