import { Api } from '../../../src'; /* @kard/react-api */
import { apiConfig } from './apiConfig';

export const apiStore = new Api(apiConfig);
export const { api } = apiStore
