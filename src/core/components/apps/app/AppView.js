import React, { Component } from 'react';
import deepEqual from 'deep-equal';
import { Match, matchPattern } from 'react-router';

import AppAdapter from './AppAdapter';
import AppBase from './AppBase';

const createAppClass = app => app.factory(AppBase)

class AppView extends Component {
  state = {
    // The currently running application
    App: createAppClass(this.props.appMeta)
  };

  componentWillReceiveProps(nextProps) {
    // Whenever we switch application, prepare the new app
    if (this.props.appMeta.id !== nextProps.appMeta.id) {
      this.setState({
        App: createAppClass(nextProps.appMeta)
      })
    }
  }

  // TODO Remove when React Router doesn't unnecessarily update `params`
  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state);
  }

  render() {
    const {
      appMeta,
      core,
      apis,
      updateTimepickerRefreshInterval
    } = this.props;
    const { App } = this.state;

    // Build up the api that we make available to plugins
    const kibana = {
      timepicker: {
        updateRefreshInterval: updateTimepickerRefreshInterval
      },
      routing: {
        Match,
        matchPattern
      },
      ...apis
    };

    return <AppAdapter
      key={ appMeta.id }
      App={ App }
      core={ core }
      kibana={ kibana } />
  }
}

export default AppView

