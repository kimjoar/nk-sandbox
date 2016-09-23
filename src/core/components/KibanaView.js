import React from 'react';
import {Match, Link, Miss} from 'react-router';
import {map, flatMap} from 'lodash';
import {HomeContainer} from './home';
import {AppsContainer} from './apps';

const createAppUrl = (pluginId, app) => `/app/${pluginId}/${app.id}`;

function NoMatch({ location }) {
  return <p>Route does not exist: { location.pathname }</p>
}

function AppView({ plugins }) {
  return <div>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        {
          flatMap(plugins, (plugin, pluginId) =>
            map(plugin.apps, app =>
              <li key={ app.name }>
                <Link to={ createAppUrl(pluginId, app) }>{ pluginId }: { app.name }</Link>
              </li>
            )
          )
        }
      </ul>
    </nav>

    <Match exactly pattern='/' component={ HomeContainer }/>
    <Match pattern='/app' component={ AppsContainer }/>
    <Miss component={ NoMatch }/>
  </div>
}

export default AppView;
