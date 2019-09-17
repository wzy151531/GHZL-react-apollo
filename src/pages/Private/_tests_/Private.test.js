import React from 'react';
import Private from '../Private';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

test('Private should render correctly', () => {
  const component = renderer.create(
    <Private/>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('should change text parentMsg state with button click', () => {
  const component = mount(<Private/>);
  expect(component.state('parentMsg')).toEqual('parentMsg');
  expect(component.state('sonMsg')).toEqual('sonMsg');

  component.find('button#changeParentMsg').simulate('click');
  // component.instance().changeParentMsg('fuck');
  expect(component.state('parentMsg')).toEqual('fuck');
  component.unmount();
});

test('callMethod of component', () => {
  const component = shallow(<Private/>);
  const result = component.instance().showSth();
  console.log(result);
});