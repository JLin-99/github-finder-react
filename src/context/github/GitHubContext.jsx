import { createContext, useReducer } from "react";
import gitHubReducer from "./gitHubReducer";

const GitHubContext = createContext();

const GITHUB_API_URL = process.env.REACT_APP_GITHUB_URL;

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(gitHubReducer, initialState);

  const searchUsers = async (username) => {
    setLoading();

    const params = new URLSearchParams({
      q: username,
    });

    const response = await fetch(`${GITHUB_API_URL}/search/users?${params}`);
    const { items } = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  const getUser = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(`${GITHUB_API_URL}/users/${login}`);

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      const repos_response = await fetch(
        `${GITHUB_API_URL}/users/${login}/repos?${params}`
      );
      const repos = await repos_response.json();
      data.repos = repos;

      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GitHubContext.Provider
      value={{
        user: state.user,
        users: state.users,
        loading: state.loading,
        getUser,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export default GitHubContext;
