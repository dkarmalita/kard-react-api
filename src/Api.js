import { Store } from './Store';

const handleResponce = (name, apiStore) => response => {
    const state = { run: false }
    state.response = response
    if(!response.ok) {
      const { status, statusText } = response
      state.error = {
        status,
        statusText,
      }
    } else {
      state.error = null
    }
    return response.json().then(data => {
      state.data = data
      apiStore.setState({ [name]: state })
      return (state)
    })
  }

const ajaxInitialState = {
  data: null,
  error: null,
  response: null,
  run: false,
}

const createFetchCall = (name, runFetch, apiStore) => {
  return (fetchParams) => {
    const oldState = apiStore.getState()[name]
    apiStore.setState({ [name]: { ...oldState, run: true } })
    return runFetch(fetchParams)
    .then(handleResponce(name, apiStore))
  }
}

const createApi = (
  cfg,
  apiStore = null,
) => Object.keys(cfg)
  .reduce((obj, item) => {
    obj[item]=createFetchCall(item, cfg[item], apiStore)
    return obj
  }, {})

const createApiInitialState = (
  cfg,
  initialState = {},
) => Object.keys(cfg)
  .reduce((obj, item) => {
    obj[item]=initialState
    return obj
  }, {})

export function Api(apiConfig){
  const apiStore = Store({})
  apiStore.api = createApi(apiConfig, apiStore)
  apiStore.setState(createApiInitialState(apiConfig, ajaxInitialState))
  return apiStore
}

