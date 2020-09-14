import React from 'react';
import { shallow } from 'enzyme';
import { PostSummaryComponent } from './PostSummary';

describe('Component PostSummary', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostSummaryComponent />);
    expect(component).toBeTruthy();
  });
});