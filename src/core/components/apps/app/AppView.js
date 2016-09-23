import React, { Component } from 'react';
import deepEqual from 'deep-equal';
import { Match, matchPattern } from 'react-router';

import AppAdapter from './AppAdapter';
import AppBase from './AppBase';

// Every app in its own JS
// https://webpack.github.io/docs/code-splitting.html
function loadApp(pluginId, appId) {
  return new Promise(resolve => {
    require.ensure([], () => {
      resolve(require(`../../../../plugins/${pluginId}/apps/${appId}/index`).default);
    });
  });
}

class AppView extends Component {
  state = {
    // The currently running application
    App: undefined
  };

  componentWillMount() {
    const { pluginId, appMeta } = this.props;
    this.loadApp(pluginId, appMeta.id);
  }

  componentWillReceiveProps(nextProps) {
    // Whenever we switch application, load the new app
    if (this.props.appMeta.id !== nextProps.appMeta.id) {
      this.loadApp(nextProps.pluginId, nextProps.appMeta.id);
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
      updateTimepickerRefreshInterval
    } = this.props;
    const { App } = this.state;

    if (App === undefined) {
      return <p>Fetching app: { appMeta.name }</p>
    }

    // Build up the api that we make available to plugins
    const kibanaFacade = {
      timepicker: {
        updateRefreshInterval: updateTimepickerRefreshInterval
      },
      routing: {
        Match,
        matchPattern
      }
    };

    return <AppAdapter
      App={ App }
      core={ core }
      kibanaFacade={ kibanaFacade } />
  }

  // Helper that first resets the current app, then fetches and prepares the
  // new app
  loadApp(pluginId, appId) {
    this.setState({
      App: undefined
    });

    // Only load app when needed
    loadApp(pluginId, appId).then(createAppClass => {
      this.setState({
        App: createAppClass(AppBase)
      });
    });
  }
}

export default AppView

