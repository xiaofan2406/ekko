/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import { Component } from '../Brand';

describe('Brand component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('matches snapshot', () => {
    const props = { classes: {} };
    const component = shallow(<Component {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('does not update on props changes', () => {
    const renderSpy = jest.spyOn(Component.prototype, 'render');
    const props = { classes: {} };
    const component = shallow(<Component {...props} />);

    expect(renderSpy).toHaveBeenCalledTimes(1);

    component.setProps({
      classes: { someClass: {} },
    });

    expect(renderSpy).toHaveBeenCalledTimes(1);
  });
});
