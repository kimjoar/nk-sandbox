import React, { Component } from 'react'
import deepEqual from 'deep-equal'

import Run from './Run'
import KibanaApplication from './KibanaApplication'

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

    // Only load app when needed
    loadApp(appMeta.id).then(createAppClass => {
      this.setState({
        App: createAppClass(KibanaApplication)
      })
    })
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
      updateTimepickerRefreshInterval
    }

    return <Run
      App={ App }
      core={ core }
      api={ api } />
  }
}

export default Application
