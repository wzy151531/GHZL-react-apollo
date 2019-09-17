import React from 'react';
import UserDetail from '../UserDetail';
import renderer from 'react-test-renderer';

test('UserDetail should render correctly', () => {
  const matchProps = {
    params: {
      id: 1,
    },
  };
  const component = renderer.create(
    <UserDetail match={matchProps}/>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});