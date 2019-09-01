import React from 'react';

export const UserDetail = props => {
  return (
    <div>{`${props.match.params.id}'s detail`}</div>
  );
};