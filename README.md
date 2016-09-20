We're merging multiple philosophies. And we want to do it cleanly.
Which philosophy has to yield? (i.e. there will be pain for some)

# Lifecycle

Applications and plugins should have a proper lifecycle.

## Application (class: `KibanaApplication`)

- `constructor`: Applications are created when needed
- `willMount`: A Kibana app won't always render, called before rendering
- `didMount`: After plugin has rendered, you know have `el` available
- `willUpdate`: Before new props, e.g. if core or plugins state has changed
- `didUpdate`: After new props
- `willUnmount`: When removing app
- `render`: To render, defaults to `<div />` (Or remove to being with?)

## Plugin (class: `KibanaPlugin`)

- `constructor`: All plugins are created when Kibana starts up
- `willUpdate`: Receiving new props, e.g. if core or plugins state has changed

# State

Both core and plugin state lives in Redux in core

- Within core it's normal action -> reducer flow.
- From plugins it's notifying about change, then core pulling changes.

Re-render plugins when state has updated. This will trigger `willUpdate` and `didUpdate`.
Also broadcast changes using a middleware? (If so, use Court's idea for specific broadcasts?)

Doing this it should be easy to include in Redux, Angular, and other apps.

# Communication

We need to handle communication from core to plugin, from plugin to core,
and from plugin to plugin.

## Core to plugin

State updates + lifecycle.

Is that enough?

## Plugin to core

TimePicker in core? Need to be able to update, e.g.

```
kibana.timepicker.setRefreshInterval(60)
```

Which end up in a "pure Redux action dispatch"?

Some plugins need to extend core, e.g. Security.

## Plugin to plugin

External api (aka actions) + state?

How do we get specific broadcast to work for plugins?

### Depend on other Kibana apps or plugins

Strict pre-defined deps? Maybe something like:

```
dependsOn: ['plugin-1', 'app-1', 'app-3']
```

Is this _actually_ needed?

# Router

Core _must_ own routing. Use React Router v4. Need to inject `Match`,
`matchPattern`, `Link` et al.

# Kibana kit / api

Features plugins have access to.

Does _NOT_ have state.

## Routing

```
const { Match, matchPattern } = kibana.routing
```

## ES query

```
kibana.es.query('...')
```

## Ajax request to Kibana backend

```
kibana.ajax.get('...')
```

# Build + dependencies

Plugins/applications _must_ be able to build on their own.

## External deps

Do whatever you want, as long as you end up with a set of built files.

Huge deps, such as Angular et al, might need to be excluded in the build process.

If so, we might need to have strict requirements, e.g. _same_ version of Angular, Lodash, et al.

Verify versions at startup?

(It isn't optimal, but it is how it is.)

## Kibana deps

_Always_ inject Kibana deps. A plugin should _never_ be able to require
something from Kibana core.

One idea for applications and plugins is to receive the base class:

```
export default function(KibanaApplication) {
  return class MyKibanaApp extends KibanaApplication {
  }
}

// aka

export default KibanaApplication =>
  class MyKibanaApp extends KibanaApplication {
  }
```
