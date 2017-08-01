import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { AppContainer } from '~/containers'
import { configureStore } from '~/store'

const store = configureStore()

export default class Voluncheering extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
