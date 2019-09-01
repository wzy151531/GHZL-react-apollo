import React from 'react';

export default class UserDetail extends React.Component {
  render() {
    return (
      <div>{`${this.props.match.params.id}'s detail`}</div>
    );
  }
};