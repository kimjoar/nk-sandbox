We're merging multiple philosophies. And we want to do it cleanly.
Which philosophy has to yield? (i.e. there will be pain for some)

# Plugins

Plugins are "containers" for extensions. One type of extension is applications. 
A plugin can consist of multiple extensions, e.g. multiple applications.

A plugin can also define new extension points, e.g. such as the management
app or vis extensions.

NOTE: When talking about plugins in the rest of this document I usually
talk about _any_ extension.

# Lifecycle

All types of extensions should have a proper lifecycle.

So far only the Application extension has been described:

## Application (class: `KibanaApplication`)

- `constructor`: Applications are created when needed
- `willMount`: A Kibana app won't always render, called before rendering
- `didMount({ el })`: After plugin has rendered, you now have `el` available
- `willUpdate(nextProps)`: Before new props, e.g. if core or plugins state
  has changed
- `didUpdate`: After new props have been set
- `willUnmount`: When removing app

_Maybe_ add `render` to make it easier for React plugins, however: we should
consider keeping extension points "framework neutral" (aka no framework
treated as a first-class citizen)

(Note: `render` is added in the code now, mostly because `Match` and other
router helpers rely on `context`, so they no longer work if a plugin renders
a _new_ React app. I think we need to remove `render` and find some other
way of handling routing.)

# State

Both core and plugin state lives in Redux in core. That ensures that we
re-render both core and plugins whenever state changes.

- Within core it's normal action -> reducer flow.
- From plugins/apps it's notifying about change, then core pulling changes.

This will trigger `willUpdate` and `didUpdate` on plugins.

Should we also broadcast changes using a middleware? (If so, use Court's
idea for specific broadcasts?)

Doing this it _should_ be easy to include in Redux, Angular, and other apps.
One thing we need to make sure of is how to propagate the state into
Angular apps.

## Source-of-truth

To make it clear: We _won't_ strictly have one source-of-truth.
Core _will_, but plugins own their own state. However, we "copy" the
_public_ state into Core to make it available for other plugins.

Something we need to explore: I worry about loops. Plugin A sets new state,
Core pulls it, re-renders Plugin A, which trigger a new update, Core pulls, etc.

# Communication

We need to handle communication from core to plugin, from plugin to core,
and from plugin to plugin.

## Core to plugin

State updates + lifecycle.

(How do we define extension points?)

## Plugin to core

Inject actions into plugins. When called these actions might end up as
state changes in core that in turn will update the plugin.

Some plugins need to extend core, e.g. Security. What does it need to
extend? One example is that it now registers interceptors on ajax requests
(in order to redirect to login page if a 401 is received).

Some plugins also need to register additional extension points, e.g. the
Management app (see more about this further down).

One potential issue: Let's say we have notifications as a core feature.
A plugin wants to add a notification that includes a link. How? This needs
an api that includes rendering, which opens a can of worms.

(Hm, need to think about extending "Kibana facade" vs actually extending
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

External api (aka actions) + state + extension points.

(_If_ we end up broadcasting like in Court's suggestion, how do we get
specific broadcast to work for plugins?)

EDIT: Got new ideas for the stuff below after chatting to Uri, will be
updating it asap.

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

(TODO: Describe in more detail)

## Defining extension points

How does plugins define extension points? E.g. management plugin defining
a `managementSections` extension.

Maybe a `registerExtension` helper received from core? How do they start?
Who owns the lifecycle? How do they render?

I think this brings us into the problems of React within Angular within React
all the way down.

# Router

Core _must_ own routing. Use React Router v4. Need to inject `Match`,
`matchPattern`, `Link` et al.

(One problem though: The React Router helpers _must_ be rendered within the
existing React app as they rely on `context`. `matchPattern` doesn't, as it's
the low-level implementation of `Match` et al. We probably need a way to
handle routing without being to coupled to the routing lib core uses.)

# Kibana facade

Features plugins have access to.

Does _NOT_ have state.

## Routing

```
const { Match, matchPattern } = kibana.routing
```

## ES query

```
kibana.esClient.whatever('...')
```

## Ajax request to Kibana backend

```
kibana.kibanaClient.get('...')
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
