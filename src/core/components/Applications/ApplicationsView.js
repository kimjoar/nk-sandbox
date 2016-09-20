import React from 'react'
import Match from 'react-router/Match'

import {
  ApplicationContainer,
} from '../Application'

function NoApp() {
  return <p>No app chosen</p>
}

function ApplicationsView({ pathname }) {
  return <div>
    <Match exactly pattern={ pathname } component={ NoApp } />
    <Match pattern={`${pathname}/:id`} component={ ApplicationContainer } />
  </div>
}

export default ApplicationsView
