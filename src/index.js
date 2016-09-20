import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Router from 'react-router/BrowserRouter'

import { AppContainer } from './core/components'
import configureStore from './configureStore'

// TODO Remove, this is just for testing.
// How do we want to get the initial list of applications?
const initialState = {
  applications: {
    foo: {
      id: 'foo',
      name: 'Angular app',
      route: 'foo'
    },
    bar: {
      id: 'bar',
      name: 'React app',
      route: 'bar'
    }
  }
}

const store = configureStore({ initial: initialState })

render(
  <Provider store={ store }>
    <Router>
      <AppContainer />
    </Router>
  </Provider>,
  document.getElementById('root')
)
