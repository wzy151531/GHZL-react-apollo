import React from 'react';
import TestSub from '../TestSub';
import renderer from 'react-test-renderer';

test('TestSub should render correctly', () => {
  const component = renderer.create(
    <TestSub/>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});