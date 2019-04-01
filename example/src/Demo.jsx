import React from 'react';
import { Store } from '../../src/Store'; /* @kard/react-api */
import { api, apiStore } from './api';

const Loading = () => <div>Loading...</div>
const NoData = ({ sectionId }) => <div>{ `${sectionId}: No Data` }</div>

const renderUsers = (userList) => userList.map((user, idx)=>(
    <div key={ user.id }>
      <br/>
      <div>{ `id: ${user.id}` }</div>
      <div>{ `username: ${user.username}` }</div>
      <div>{ `name: ${user.name}` }</div>
      <div>{ `email: ${user.email}` }</div>
      <div>{ `phone: ${user.phone}` }</div>
      <div>{ `website: ${user.website}` }</div>
    </div>
  ))

const UserList = ({ listState }) => {
  if(!listState.run && !listState.data){ return <NoData sectionId='User List' /> }
  if(listState.run){ return <Loading/> }
  return (
    <div>
      <div>{ `User List Total: ${listState.data.length} user(s)` }</div>
      <div>{ renderUsers(listState.data) }</div>
    </div>
  )
}

const NewUser = ({ newUserState }) => {
  if(!newUserState.run && !newUserState.data){ return <NoData sectionId='User Created' /> }
  if(newUserState.run){ return <Loading/> }
  return (
    <div>
      <div>User Created:</div>
      <div>{ `id: ${newUserState.data.id}` }</div>
      <div>{ `username: ${newUserState.data.username}` }</div>
      <div>{ `email: ${newUserState.data.email}` }</div>
    </div>
  )
}

const Demo = (props) => {
  // console.log('props',props)
  const { getUserList, createUser } = props.apiState;
  return (
    <div>
      <button onClick={ ()=>api.getUserList() }>Get users</button>
      <button onClick={ ()=>api.createUser({ username: 'Noob', email: 'user@email.dom' }) }>Add users</button>
      <br/><br/>
      <NewUser newUserState={ createUser }/>
      <br/>
      <UserList listState={ getUserList }/>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return { ...ownProps, apiState: state, api }
}

export default apiStore.connect(mapStateToProps)(Demo)
