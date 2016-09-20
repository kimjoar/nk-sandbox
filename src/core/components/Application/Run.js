import React, { Component } from 'react'

class RunApplication extends Component {
  constructor(props) {
    super(props)

    this.app = new props.App()
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
    console.log('new props', nextProps, this.props)
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

export default RunApplication
