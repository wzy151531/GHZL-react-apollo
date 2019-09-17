import React from 'react';
import Son from '../Son';
import renderer from 'react-test-renderer';

test('Son should render correctly', () => {
  const component = renderer.create(
    <Son sonMsg="sonMsg"/>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});