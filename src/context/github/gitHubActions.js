const GITHUB_API_URL = process.env.REACT_APP_GITHUB_URL;

export const searchUsers = async (username) => {
  const params = new URLSearchParams({
    q: username,
  });

  const response = await fetch(`${GITHUB_API_URL}/search/users?${params}`);
  const { items } = await response.json();

  return items;
};
