import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import immutableStateInvariant from 'redux-immutable-state-invariant'

import reducers from './core/reducers'

const getEnhancer = () =>
  compose(
    applyMiddleware(
      // allow actions to operate asynchronously
      thunk,

      // log actions to the console as they occur
      createLogger(),

      // ensure that state is not mutated by reducers
      immutableStateInvariant()
    ),

    // instrument with the dev tools if the browser extension is being used
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )

export default ({ initial } = {}) =>
  createStore(reducers, initial, getEnhancer())
