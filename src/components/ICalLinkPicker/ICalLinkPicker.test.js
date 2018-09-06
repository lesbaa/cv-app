/* eslint-env jest */
/* global window */
import React from 'react'
import { mount } from 'enzyme'

import ICalLinkPicker, { buildUrl } from './ICalLinkPicker.component'

describe('ICalLinkPicker', () => {
  const wrapper = mount(
    <ICalLinkPicker
      message="message 1"
      isVisible
    >
      <div className="child" />
    </ICalLinkPicker>
  )

  it('matches its snapshots', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('updates the state correctly on input change', () => {
    wrapper
      .find('input')
      .simulate('change', { target: { value: 'a_value' } })

    expect(wrapper.state('url')).toBe('/calender?datetime=a_value')
  })

  it('it throws an alert and sets state.hasError to true if an invalid url state field is entered', () => {
    const preventDefault = jest.fn()

    wrapper.setState({
      url: null,
    })

    window.alert = jest.fn()

    wrapper
      .find('.submit')
      .simulate('click', { preventDefault })

    expect(preventDefault).toHaveBeenCalled()
    expect(window.alert).toHaveBeenCalled()
  })

  it('follows the default behaviour is state.url is valid', () => {
    const preventDefault = jest.fn()

    wrapper.setState({
      url: '/calender?datetime=hiyahiyahiya',
    })

    window.alert = jest.fn()

    wrapper
      .find('.submit')
      .simulate('click', { preventDefault })

    expect(preventDefault).not.toHaveBeenCalled()
    expect(window.alert).not.toHaveBeenCalled()
  })
})

describe('buildUrl', () => {
  it('builds a url with the correct structure', () => {
    expect(buildUrl('hiyahiyahiya'))
      .toBe('/calender?datetime=hiyahiyahiya')
  })
})
