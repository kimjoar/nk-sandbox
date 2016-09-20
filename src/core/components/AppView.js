import React from 'react';
import { Match, Link, Miss } from 'react-router'
import { map } from 'lodash'

import {
  HomeContainer,
} from './Home'

import {
  ApplicationsContainer,
} from './Applications'

const createAppUrl = app => `/app/${app.route}`

function NoMatch({ location }) {
  return <p>Route does not exist: { location.pathname }</p>
}

function AppView({ applications }) {
  return <div>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        {
          map(applications, app =>
            <li key={ app.name }>
              <Link to={ createAppUrl(app) }>App: { app.name }</Link>
            </li>
          )
        }
      </ul>
    </nav>

    <Match exactly pattern='/' component={ HomeContainer }/>
    <Match pattern='/app' component={ ApplicationsContainer }/>
    <Miss component={ NoMatch }/>
  </div>
}

export default AppView;
