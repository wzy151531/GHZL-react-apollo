import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import User from '../User';
import renderer from 'react-test-renderer';
import { client } from '../../../index';

test('User should render correctly', () => {
  const component = renderer.create(
    <ApolloProvider client={client}><User/></ApolloProvider>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});