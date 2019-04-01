import { Observable } from './Observable';
import { Connect } from './Connect';

export const Store = function(initialState={}){
  const $store = new Observable(initialState);
  const connect = new Connect($store);
  return {
    ...$store,
    connect,
  }
}