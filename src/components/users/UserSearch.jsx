import { useContext, useState } from "react";
import AlertContext from "../../context/alert/AlertContext";
import GitHubContext from "../../context/github/GitHubContext";
import { searchUsers } from "../../context/github/gitHubActions";

export default function UserSearch() {
  const [username, setUsername] = useState("");

  const { users, dispatch } = useContext(GitHubContext);
  const { setAlert } = useContext(AlertContext);

  const handleChange = (e) => setUsername(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      setAlert("Please enter something", "error");
    } else {
      dispatch({ type: "SET_LOADING" });
      const users = await searchUsers(username);
      dispatch({ type: "GET_USERS", payload: users });
      setUsername("");
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lag:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search GitHub user"
                value={username}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button
            className="btn btn-ghost btn-lg"
            onClick={() => dispatch({ type: "CLEAR_USERS" })}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
