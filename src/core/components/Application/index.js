import React, { Component } from 'react'
import deepEqual from 'deep-equal'

import Run from './Run'
import KibanaApplication from './KibanaApplication'

// Every app in its own JS
// https://webpack.github.io/docs/code-splitting.html
function loadApp(packageName) {
  return new Promise(resolve => {
    require.ensure([], () => {
      resolve(require(`../../../applications/${packageName}/index`).default)
    })
  })
}

class Application extends Component {
  state = {
    App: undefined
  }

  componentWillMount() {
    const { appMeta } = this.props
    this.loadApp(appMeta.id)
  }

  componentWillReceiveProps(nextProps) {
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

    const api = {
      timepicker: {
        updateRefreshInterval: updateTimepickerRefreshInterval
      }
    }

    return <Run
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
        App: createAppClass(KibanaApplication)
      })
    })
  }
}

export default Application
