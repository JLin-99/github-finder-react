import { createContext, useReducer } from "react";
import gitHubReducer from "./gitHubReducer";

const GitHubContext = createContext();

const GITHUB_API_URL = process.env.REACT_APP_GITHUB_URL;

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(gitHubReducer, initialState);

  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_API_URL}/users`);
    const data = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export default GitHubContext;
