export const registerApi = (id, api) => ({
  type: 'REGISTER_API',
  payload: api,
  meta: { id }
})
