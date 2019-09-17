import React, { PureComponent } from 'react';

export default class Son extends PureComponent {
  render() {
    console.log('Son PureComponent render');
    return (
      <div>{this.props.sonMsg}</div>
    );
  }
}