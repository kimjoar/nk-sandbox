export const registerApi = (app, api) => ({
  type: 'REGISTER_API',
  payload: api,
  meta: {
    pluginId: app.pluginId,
    appId: app.id
  }
})
