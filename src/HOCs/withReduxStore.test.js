/* eslint-env jest */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-multi-comp */
/* global window */

import React from 'react'
import { shallow } from 'enzyme'
import configureStore from '~/store'
import withRedux, { getOrCreateStore } from './withReduxStore'

jest.mock('~/store', () => jest.fn(
  (initState = 'INIT_STATE_UNDEFINED') => ({
    initState,
    getState: jest.fn(() => 'MOCK_STATE'),
  })
))

const mockInitState = 'MOCK_INIT_STATE'

describe('getOrCreateStore', () => {
  beforeEach(() => {
    delete window.__NEXT_REDUX_STORE__
    process.browser = true
  })

  afterEach(() => {
    delete window.__NEXT_REDUX_STORE__
  })

  it('creates a new store from the init state on the server', () => {
    process.browser = false
    getOrCreateStore(mockInitState)
    expect(configureStore).toHaveBeenCalledWith(mockInitState)
  })

  it('checks if window[__NEXT_REDUX_STORE__] has a store already, if not then assigns configureStore(initState) to it', () => {
    getOrCreateStore(mockInitState)
    expect(configureStore).toHaveBeenCalledWith(mockInitState)
    expect(window.__NEXT_REDUX_STORE__.initState).toBe(mockInitState)
  })

  it('if window[__NEXT_REDUX_STORE__] exists, if not then return window.__NEXT_REDUX_STORE__', () => {
    window.__NEXT_REDUX_STORE__ = mockInitState
    const expected = getOrCreateStore(mockInitState)
    expect(expected).toBe(mockInitState)
  })
})

describe('withRedux', () => {
  class MockApp extends React.Component {
    static getInitialProps = jest.fn()
  }

  const mockAppContext = {}

  beforeEach(() => {
    mockAppContext.ctx = {}
    jest.clearAllMocks()
  })

  it('it calls the child components getInitialProps with appContext when getInitialProps is called', () => {
    const HOC = withRedux(MockApp)
    HOC.getInitialProps(mockAppContext)
    expect(MockApp.getInitialProps).toHaveBeenCalledWith(mockAppContext)
  })

  it('assigns a new redux store to the instance on construction', () => {
    const HOC = withRedux(MockApp)
    const initialProps = HOC.getInitialProps(mockAppContext)
    const wrapper = shallow(
      <HOC {...initialProps} />
    )
    const instance = wrapper.instance()

    expect(instance.store.initState).toBe('INIT_STATE_UNDEFINED')
    expect(instance.store.getState()).toBe('MOCK_STATE')
  })

  it('renders the App component with the approprite props', async () => {
    const HOC = withRedux(MockApp)
    const initialProps = await HOC.getInitialProps(mockAppContext)

    const {
      foo,
      bar,
      initialReduxState,
      store,
    } = shallow(
      <HOC
        {...initialProps}
        foo="TEST_PROP"
        bar="ANOTHER_TEST_PROP"
      />
    ).props()

    expect(foo).toBe('TEST_PROP')
    expect(bar).toBe('ANOTHER_TEST_PROP')
    expect(initialReduxState).toBe('MOCK_STATE')
    expect(store).toHaveProperty('getState')
    expect(store).toHaveProperty('initState')
  })

  it('does not fail if the App does not have a getInitialProps method', async () => {
    class MockAppNoGIP extends React.Component {
      componentDidMount = () => {}
      render = () => null
    }

    expect(MockAppNoGIP.getInitialProps).toBeFalsy()

    const HOC = withRedux(MockAppNoGIP)
    const initProps = await HOC.getInitialProps(mockAppContext)

    expect(initProps).toEqual({
      initialReduxState: 'MOCK_STATE',
    })
  })

})
