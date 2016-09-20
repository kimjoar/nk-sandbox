import React from 'react';
import { render } from 'react-dom';

console.log('bar required')

export default KibanaApplication =>
  class Bar extends KibanaApplication {
    constructor(props) {
      super(props)
      console.log('bar constructor', props)
    }

    didMount({ el }) {
      this.el = el
      console.log('bar did mount', el, this.props)

      this.render()

      this._interval = setInterval(() => {
        this.props.api.timepicker.updateRefreshInterval(Math.random() * 100)
      }, 3000)
    }

    didUpdate() {
      console.log('bar did update', this.props.core)

      this.render()
    }

    willUnmount() {
      clearInterval(this._interval)
    }

    // This is just to show that you can implement your own `render` in an app,
    // so we don't necessarily have to provide it built-in.
    render() {
      render(
        <p>bar: { this.props.core.refreshInterval }!</p>,
        this.el
      )
    }
  }
