import axios from 'axios';
import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';
const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = { users: [], loading: false };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  //seach users
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await axios.get(
      `https://api.github.com/search/users?${params}`
    );
    const { items } = response.data;
    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  // const searchUsers = async () => {
  //   setLoading();
  //   const response = await fetch(
  //     'https://api.github.com/search/users?q=bradtraversy'
  //   );
  //   const { items } = await response.json();
  //   dispatch({
  //     type: 'GET_USERS',
  //     payload: items,
  //   });
  // };

  //set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };
  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS',
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        clearUsers,
        searchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
