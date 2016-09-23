import React, { Component } from 'react'
import { omit } from 'lodash'

export default class AppAdapter extends Component {
  
  constructor(props) {
    super(props);

    const { App } = props

    this.app = new App(omit(props, 'App'));
    this.el = undefined;
  }

  componentWillMount() {
    this.props.registerApi(this.app.api)
    this.app.willMount();
  }

  componentDidMount() {
    this.app.didMount({
      el: this.el
    })
  }

  componentWillReceiveProps(nextProps) {
    var newProps = omit(nextProps, 'App');
    this.app.willUpdate(newProps);
    this.app.props = newProps;
    this.app.didUpdate();
  }

  componentWillUnmount() {
    // unregister api
    this.app.willUnmount();
  }

  render() {
    return <div ref={ node => { this.el = node } }>
      { this.app.render() }
    </div>
  }
}