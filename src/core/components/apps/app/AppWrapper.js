import React, { Component } from 'react'
import { omit } from 'lodash'

export default class AppWrapper extends Component {
  
  constructor(props) {
    super(props);
    this.app = new props.App(omit(props, 'App'));
    this.el = undefined;
  }

  componentWillMount() {
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
    this.app.willUnmount();
  }

  render() {
    return <div ref={ node => { this.el = node } }>
      { this.app.render() }
    </div>
  }
}