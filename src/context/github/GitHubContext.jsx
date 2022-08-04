import { createContext, useReducer } from "react";
import gitHubReducer from "./gitHubReducer";

const GitHubContext = createContext();

const GITHUB_API_URL = process.env.REACT_APP_GITHUB_URL;

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
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

  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export default GitHubContext;
