import React, { Component } from 'react'
import deepEqual from 'deep-equal'
import { Match, matchPattern } from 'react-router'

import KibanaApplicationRunner from './KibanaApplicationRunner'
import KibanaApplicationBase from './KibanaApplicationBase'

// Every app in its own JS
// https://webpack.github.io/docs/code-splitting.html
function loadApp(packageName) {
  return new Promise(resolve => {
    require.ensure([], () => {
      resolve(require(`../../../applications/${packageName}/index`).default)
    })
  })
}

class ApplicationView extends Component {
  state = {
    // The currently running application
    App: undefined
  }

  componentWillMount() {
    const { appMeta } = this.props
    this.loadApp(appMeta.id)
  }

  componentWillReceiveProps(nextProps) {
    // Whenever we switch application, load the new app
    if (this.props.appMeta.id !== nextProps.appMeta.id) {
      this.loadApp(nextProps.appMeta.id)
    }
  }

  // TODO Remove when React Router doesn't unnecessarily update `params`
  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state)
  }

  render() {
    const {
      appMeta,
      core,
      updateTimepickerRefreshInterval
    } = this.props
    const { App } = this.state

    if (App === undefined) {
      return <p>Fetching app: { appMeta.name }</p>
    }

    // Build up the api that we make available to plugins
    const api = {
      timepicker: {
        updateRefreshInterval: updateTimepickerRefreshInterval
      },
      routing: {
        Match,
        matchPattern
      }
    }

    return <KibanaApplicationRunner
      App={ App }
      core={ core }
      api={ api } />
  }

  // Helper that first resets the current app, then fetches and prepares the
  // new app
  loadApp(id) {
    this.setState({
      App: undefined
    })

    // Only load app when needed
    loadApp(id).then(createAppClass => {
      this.setState({
        App: createAppClass(KibanaApplicationBase)
      })
    })
  }
}

export default ApplicationView

