import React from 'react';
import { Store } from '../../src/Store'; /* @kard/react-api */
import { api, apiStore } from './api';
import './Demo.scss';

const Loading = () => <div className='tool-text'>Loading...</div>
const NoData = ({ sectionId }) => <div>{ `${sectionId}: ` }<span className='tool-text'>No Data</span></div>

const renderUsers = (userList) => userList.map((user, idx)=>(
    <div key={ user.id } className='boxed-block'>
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
      <div className='boxed-block'>
        <div>{ `id: ${newUserState.data.id}` }</div>
        <div>{ `username: ${newUserState.data.username}` }</div>
        <div>{ `email: ${newUserState.data.email}` }</div>
      </div>
    </div>
  )
}

const Demo = (props) => {
  // console.log('props',props)
  const { getUserList, createUser } = props.apiState;
  document.title = props.appName;
  return (
    <div className='Demo'>
      <div className='boxed-block boxed-block--tools'>
        <button onClick={ ()=>api.getUserList() }>Get users</button>
        <button onClick={ ()=>api.createUser({ username: 'Noob', email: 'user@email.dom' }) }>Add users</button>
      </div>
      <NewUser newUserState={ createUser }/>
      <br/>
      <UserList listState={ getUserList }/>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return { ...ownProps, appName: '@kard/react-api demo',apiState: state, api }
}

export default apiStore.connect(mapStateToProps)(Demo)
