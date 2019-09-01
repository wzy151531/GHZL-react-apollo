import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AuthRouter from './Authorization/AuthRouter';
import Login from './Layouts/Login';
import BasicLayout from './Layouts/BasicLayout';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <AuthRouter path="/login" component={Login}/>
        <AuthRouter path="/" component={BasicLayout}/>
      </Switch>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
