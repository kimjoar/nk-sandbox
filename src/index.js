import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Router from 'react-router/BrowserRouter'

import App from './core/components/AppContainer'
import configureStore from './configureStore'

// TODO Remove, just for testing
const initialState = {
  applications: {
    foo: {
      id: 'foo',
      name: 'Foo',
      route: 'foo'
    }
  }
}

const store = configureStore({ initial: initialState })

render(
  <Provider store={ store }>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
