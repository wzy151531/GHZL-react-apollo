import React from 'react';

export default class Private extends React.Component {
  render() {
    return (
      <div>Private.<p>This page can only be accessed by admin.</p></div>
    );
  }
};