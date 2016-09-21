import React from 'react';
import Match from 'react-router/Match';

import {
  AppContainer,
} from './app';

function NoApp() {
  return <p>No app chosen</p>
}

function ApplicationsView({ pathname }) {
  return <div>
    <Match exactly pattern={ pathname } component={ NoApp } />
    <Match pattern={`${pathname}/:id`} component={ AppContainer } />
  </div>
}

export default ApplicationsView;
