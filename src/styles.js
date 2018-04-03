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

  &:focus {
    border-color: grey;
  }

  &.sortable {
    cursor: pointer;
  }
`;

export const cssGrid = css`
  display: grid;
  background-color: #232323;
  color: #ffffff;
`;
