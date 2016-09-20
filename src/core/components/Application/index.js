import React, { Component } from 'react'

import Run from './Run'

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

    loadApp(appMeta.id).then(app => {
      this.setState({ app })
    })
  }

  render() {
    const { appMeta } = this.props

    if (this.state.app !== undefined) {
      return <Run app={ this.state.app } />
    }

    return <p>Fetching app: { appMeta.name }</p>
  }
}

export default Application
