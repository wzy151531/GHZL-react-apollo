import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col, message } from 'antd';
import './Login.css';
import Logo from '../assets/GHZL.png';

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.username === 'GHZL' && values.password === 'admin') {
          localStorage.setItem('GHZL-username', values.username);
          localStorage.setItem('GHZL-authority', JSON.stringify(['admin']));
          this.props.history.push('/');
        } else if (values.username === 'GHZL' && values.password === 'subadmin') {
          localStorage.setItem('GHZL-username', values.username);
          localStorage.setItem('GHZL-authority', JSON.stringify(['sub-admin']));
          this.props.history.push('/');
        } else {
          message.error('UnAccess');
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row style={{ height: '80vh' }} type="flex" justify="center" align="middle">
        <Col>
          <Row><img width={300} src={Logo} alt="logo"/></Row>
          <Row>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                    placeholder="Username"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Col>
      </Row>
    );
  }
}

const Login = Form.create()(LoginForm);

export default Login;