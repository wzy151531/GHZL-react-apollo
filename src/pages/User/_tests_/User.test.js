import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import User from '../User';
import renderer from 'react-test-renderer';
import { uri } from '../../../consts/apolloUri';

const client = new ApolloClient({
  uri: uri,
});

test('User should render correctly', () => {
  const component = renderer.create(
    <ApolloProvider client={client}><User/></ApolloProvider>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});