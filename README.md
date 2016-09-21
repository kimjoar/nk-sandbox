We're merging multiple philosophies. And we want to do it cleanly.
Which philosophy has to yield? (i.e. there will be pain for some)

# Extension "points"

(I need to re-work this. I don't think it fits our current Kibana plugins.
E.g. Security needs to be loaded, but will only be "rendered" in certain
cases, e.g. login screen. It still needs to run in the background at all
times to do it's work, e.g. listening for 401 on ajax requests etc.)

Initially two types of extensions: Plugins and Applications. The primary
difference is that plugins are not rendered, while applications are. Only
_one_ application is rendered at a time. Plugins and apps can also depend
on other plugins.

In the future we might have other types of extensions, such as vis extensions.

# Lifecycle

Applications and plugins should have a proper lifecycle.

## Application (class: `KibanaApplication`)

- `constructor`: Applications are created when needed
- `willMount`: A Kibana app won't always render, called before rendering
- `didMount({ el })`: After plugin has rendered, you now have `el` available
- `willUpdate(nextProps)`: Before new props, e.g. if core or plugins state
  has changed
- `didUpdate`: After new props have been set
- `willUnmount`: When removing app

_Maybe_ add `render` to make it easier for React plugins:

- `render`: To render, defaults to `<div />`

(Note: `render` is added in the code now, mostly because `Match` and other
router helpers rely on `context`, so they no longer work if a plugin renders
a _new_ React app.)

## Plugin (class: `KibanaPlugin`)

- `constructor`: All plugins are created when Kibana starts up
- `willUpdate(nextProps)`: Before new props, e.g. if core or plugins state
- `didUpdate`: After new props have been set

(Does it make sense to start and stop a plugin? What's the process for it?
If so we also need lifecycle events for when it's added and removed.)

# State

Both core and plugin/application state lives in Redux in core. That ensures
that we'll re-render both core and apps whenever state changes.

- Within core it's normal action -> reducer flow.
- From plugins/apps it's notifying about change, then core pulling changes.

This will trigger `willUpdate` and `didUpdate` on apps and plugins.

Should we also broadcast changes using a middleware? (If so, use Court's
idea for specific broadcasts?)

Doing this it _should_ be easy to include in Redux, Angular, and other apps.
One thing we need to make sure of is how to propagate the state into
Angular apps.

## Source-of-truth

To make it clear: We _won't_ strictly have one source-of-truth.
Core _will_, but plugins and apps own their own state. However, we "copy"
the _public_ state into Core to make it available for other plugins and apps.

Something we need to explore: I worry about loops. Plugin A sets new state,
Core pulls it, re-renders Plugin A, which trigger a new update, Core pulls, etc.

# Communication

We need to handle communication from core to plugin, from plugin to core,
and from plugin to plugin.

## Core to plugin

State updates + lifecycle.

Is that enough?

## Plugin to core

Inject actions into plugins. When called these actions might end up as
state changes in core that in turn will update the plugin.

Some plugins need to extend core, e.g. Security. What does it need to
extend? One example is that it now registers interceptors on ajax requests
(in order to redirect to login page if a 401 is received).

(Hm, need to think about extending "Kibana kit/api" vs actually extending
core. What's the difference? Is only extending the kit/api needed?)

(Crazy idea: Depending on how strictly we rely on Redux in core, middleware
is _potentially_ a sensible extension point. HyperTerm does this, look at
that for inspiration.)

### Example

TimePicker in core? Need to be able to update, e.g.

```
kibana.timepicker.setRefreshInterval(60)
```

Which end up in a "pure Redux action dispatch"?

## Plugin to plugin

External api (aka actions) + state?

(_If_ we end up broadcasting like in Court's suggestion, how do we get
specific broadcast to work for plugins?)

Potential idea for external api:

```
class MyApp extends KibanaApplication {
  api = {
    sayHi: (name) => this.doSomething(name)
  }
}
```

A plugin gets access to this through:

```
this.props.applications.MyApp.sayHi("foo")
```

### Depend on other Kibana plugins

Strict pre-defined deps? Maybe something like:

```
dependsOn: ['plugin-1', 'plugin-2']
```

Does it ever make sense to depend on an app? It has to _only_ be plugins,
right? As apps are only rendered one at a time, so it doesn't make sense
to depend on others.

_However_, what about plugins? Can they depend on apps? That _seems_ weird,
but not sure I've thought of the edge-cases. E.g. does reporting _depend_
on Visualize?

# Router

Core _must_ own routing. Use React Router v4. Need to inject `Match`,
`matchPattern`, `Link` et al.

(One problem though: The React Router helpers _must_ be rendered within the
existing React app as they rely on `context`. `matchPattern` doesn't, as it's
the low-level implementation of `Match` et al.)

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
