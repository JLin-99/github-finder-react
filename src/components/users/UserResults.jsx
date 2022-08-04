import { useEffect, useState } from "react";

export default function UserResults() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`);
    const data = await response.json();

    setUsers(data);
    setLoading(false);
  };

  return !loading ? (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((user) => (
        <h3>{user.login}</h3>
      ))}
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}