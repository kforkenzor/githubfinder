import React from 'react';
import { useContext, useEffect } from 'react';
import GithubContext from '../../context/github/GithubContext';
import axios from 'axios';
import UserList from './UserList';
import Spinner from '../layout/Spinner';

function UserResults() {
  const { users, loading, fetchUsers } = useContext(GithubContext);

  if (!loading) {
    return (
      <>
        <UserList users={users} />
      </>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
