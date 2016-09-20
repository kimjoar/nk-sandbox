import React, { Component } from 'react'
import { omit } from 'lodash'

class KibanaApplicationRunner extends Component {
  constructor(props) {
    super(props)

    this.app = new props.App(omit(props, 'App'))
    this.el = undefined
  }

  componentWillMount() {
    this.app.willMount()
  }

  componentDidMount() {
    this.app.didMount({
      el: this.el
    })
  }

  componentWillReceiveProps(nextProps) {
    var newProps = omit(nextProps, 'App')
    this.app.willUpdate(newProps)
    this.app.props = newProps
    this.app.didUpdate()
  }

  componentWillUnmount() {
    this.app.willUnmount()
  }

  shouldComponentUpdate() {
    // The plugin re-renders itself, so we don't need to do anything here.
    return false;
  }

  render() {
    return <div ref={ node => { this.el = node } } />
  }
}

export default KibanaApplicationRunner
