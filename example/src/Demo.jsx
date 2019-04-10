import React from 'react';
import { api, apiStore } from './api';
import './Demo.scss';

/* eslint-disable react/prop-types */

const Loading = () => <div className="tool-text">Loading...</div>;
const NoData = ({ sectionId }) => (
  <div>
    { `${sectionId}: ` }
    <span className="tool-text">No Data</span>
  </div>
);

const renderUsers = userList => userList.map(user => (
  <div key={user.id} className="boxed-block">
    <div>{ `id: ${user.id}` }</div>
    <div>{ `username: ${user.username}` }</div>
    <div>{ `name: ${user.name}` }</div>
    <div>{ `email: ${user.email}` }</div>
    <div>{ `phone: ${user.phone}` }</div>
    <div>{ `website: ${user.website}` }</div>
  </div>
));

const UserList = ({ listState }) => {
  if (!listState.run && !listState.data) { return <NoData sectionId="User List" />; }
  if (listState.run) { return <Loading />; }
  return (
    <div>
      <div>{ `User List Total: ${listState.data.length} user(s)` }</div>
      <div>{ renderUsers(listState.data) }</div>
    </div>
  );
};

const NewUser = ({ newUserState }) => {
  if (!newUserState.run && !newUserState.data) { return <NoData sectionId="User Created" />; }
  if (newUserState.run) { return <Loading />; }
  return (
    <div>
      <div>User Created:</div>
      <div className="boxed-block">
        <div>{ `id: ${newUserState.data.id}` }</div>
        <div>{ `username: ${newUserState.data.username}` }</div>
        <div>{ `email: ${newUserState.data.email}` }</div>
      </div>
    </div>
  );
};

const Demo = ({ apiState, appName }) => {
  const { getUserList, createUser } = apiState;
  document.title = appName;
  return (
    <div className="Demo">
      <div className="boxed-block boxed-block--tools">
        <button type="button" onClick={() => api.getUserList()}>Get users</button>
        <button type="button" onClick={() => api.createUser({ username: 'Noob', email: 'user@email.dom' })}>Add users</button>
      </div>
      <NewUser newUserState={createUser} />
      <br />
      <UserList listState={getUserList} />
    </div>
  );
};

const mapApiStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    ...ownProps,
    appName: '@kard/react-api demo',
    apiState: state, // conteins redux-like status of all api endpoints
    api, // contains api methods to call
  };
};

export default apiStore.connect(mapApiStateToProps)(Demo);
