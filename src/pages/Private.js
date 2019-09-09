import React from 'react';
import { Row, Col, Button } from 'antd';
import Son from './Son';

export default class Private extends React.Component {
  state = {
    parentMsg: 'parentMsg',
    sonMsg: 'sonMsg',
  };

  changeParentMsg = parentMsg => {
    this.setState({
      parentMsg,
    });
  };

  render() {
    return (
      <div>Private.
        <p>This page can only be accessed by admin.</p>
        <Row type="flex" align="middle" gutter={16}>
          <Col>{this.state.parentMsg}</Col>
          <Col><Button type="primary" onClick={() => this.changeParentMsg('fuck')}>changeParentMsg</Button></Col>
        </Row>
        <Row>
          <Son sonMsg={this.state.sonMsg}/>
        </Row>
      </div>
    );
  }
};