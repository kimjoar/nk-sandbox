import React, { Component } from 'react'

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
    app: undefined
  }

  componentWillMount() {
    const { appMeta } = this.props

    // Only load app when needed
    loadApp(appMeta.id).then(app => {
      this.setState({ app })
    })
  }

  render() {
    const { appMeta } = this.props

    if (this.state.app === undefined) {
      return <p>Fetching app: { appMeta.name }</p>
    }

    const App = this.state.app(KibanaApplication)
    return <Run App={ App } />
  }
}

export default Application
