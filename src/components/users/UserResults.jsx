import { useContext } from "react";
import GitHubContext from "../../context/github/GitHubContext";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

export default function UserResults() {
  const { users, loading } = useContext(GitHubContext);

  return !loading ? (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  ) : (
    <Spinner />
  );
}
