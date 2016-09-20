import React from 'react';
import { Match, Link, Miss } from 'react-router'
import { map } from 'lodash'

import Home from './Home/HomeContainer'
import Applications from './Applications/ApplicationsContainer'

const createAppUrl = app => `/app/${app.route}`

function NoMatch({ location }) {
  return <p>Route does not exist: { location.pathname }</p>
}

function App({ applications }) {
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

    <Match exactly pattern='/' component={ Home }/>
    <Match pattern='/app' component={ Applications }/>
    <Miss component={ NoMatch }/>
  </div>
}

export default App;
