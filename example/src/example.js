/**
 * console example
 * just import the file in a project and look at the console output.
 */
import { api, apiStore } from './api';

/* -- call for a user list and get some error (in parallel) */
Promise.all([
    api.getUserList().then((data)=>{console.log('LIST OF USERS', data); return data}),
    // api.getUser(3).then((data)=>{console.log('SINGLE USER', data); return data}),
    api.getApiError().then(data=>{console.log('API ERROR', data); return data}),//.catch((error)=>console.log('API ERROR', error)),
  ]).then(statesArr => {
  console.log('[api all values]',statesArr);
  console.log('[api store final state]',apiStore.getState());
  return statesArr[0]
})

/* -- call for a single user data after that */
.then(getUsersState=>{
  const { data } = getUsersState
  if(!Array.isArray(data) || !data.length ){ return null }
  return api.getUser(data[0].id)
})

/* -- put the user's data to the console.log */
.then((getUserState)=>{
  console.log('SINGLE USER', getUserState.data);
  return getUserState.data
})
