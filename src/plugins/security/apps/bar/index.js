import React from 'react';

console.log('bar required');

function Login() {
  return <p>Login</p>
}

export default AppBase =>
  class Bar extends AppBase {
    constructor(props) {
      super(props);
      console.log('bar constructor', props);
    }

    didMount({ el }) {
      this.el = el
      console.log('bar did mount', el, this.props);

      this._interval = setInterval(() => {
        this.props.kibanaFacade.timepicker.updateRefreshInterval(Math.random() * 100)
      }, 3000);
    }

    didUpdate() {
      console.log('bar did update', this.props.core);
    }

    willUnmount() {
      clearInterval(this._interval);
    }

    render() {
      const { Match } = this.props.kibanaFacade.routing;

      return <div>
        <p>bar: { this.props.core.refreshInterval }!</p>
        <Match pattern='login' component={ Login } />
      </div>
    }
  }
