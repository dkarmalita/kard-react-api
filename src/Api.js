import Store from './Store';
import handleResponce from './handleResponce';
import ajaxInitialState from './ajaxInitialState';

const createFetchCall = (name, runFetch, apiStore) => (fetchParams) => {
  const oldState = apiStore.getState()[name];
  apiStore.setState({ [name]: { ...oldState, run: true } });
  return runFetch(fetchParams)
    .then(handleResponce(name, apiStore));
};

/* eslint-disable no-param-reassign */
const createApi = (
  cfg,
  apiStore = null,
) => Object.keys(cfg)
  .reduce((obj, item) => {
    obj[item] = createFetchCall(item, cfg[item], apiStore);
    return obj;
  }, {});

const createApiInitialState = (
  cfg,
  initialState = {},
) => Object.keys(cfg)
  .reduce((obj, item) => {
    obj[item] = initialState;
    return obj;
  }, {});

export default function Api(apiConfig) {
  const apiStore = Store({});
  apiStore.api = createApi(apiConfig, apiStore);
  apiStore.setState(createApiInitialState(apiConfig, ajaxInitialState));
  return apiStore;
}
