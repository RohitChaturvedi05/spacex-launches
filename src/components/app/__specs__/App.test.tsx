import React from 'react';
import { mount, shallow } from 'enzyme'
import getLaunchesPast from '../../../services/get-launches-past';
import Compare from '../../compare';
import App from '..';
import raw from './fixture/data.json';
import Rows from '../rows';
import { Button } from '@mui/material';
import * as Reducer from '../reducer';


jest.mock('../../../services/get-launches-past', () => jest.fn(() => Promise.resolve([])))

describe('SpaceX-Launch', () => {


  beforeEach(() => {
    getLaunchesPast.mockResolvedValue(raw.data)
  })

  it('should renders app with correct props', () => {
    const wrapper = shallow(<App />).dive()
    expect(wrapper).toMatchSnapshot()
  });

  it('should open compare', () => {

    const wrapper = shallow(<App />)

    // Should not have Compare
    expect(wrapper.find(Compare)).toHaveLength(0)

    const buttons = wrapper.find(Button)

    // Should have rows
    expect(wrapper.find(Rows)).toHaveLength(1)
    const onSelect = wrapper.find(Rows).prop('onSelect')

    // Select Two records
    onSelect && onSelect('98', true)
    onSelect && onSelect('99', true)

    //Click On Compare button
    buttons.at(0).simulate('click', {})
    wrapper.update();

    // Compare page should be open
    expect(wrapper.find(Compare)).toHaveLength(1)

    const onClose = wrapper.find(Compare).prop('onClose')
    onClose && onClose({})
    wrapper.update();

    // Should have rows not compare dialog
    expect(wrapper.find(Compare)).toHaveLength(0)
    expect(wrapper.find(Rows)).toHaveLength(1)

  });

})
