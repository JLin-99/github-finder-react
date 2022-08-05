const GITHUB_API_URL = process.env.REACT_APP_GITHUB_URL;

export const searchUsers = async (username) => {
  const params = new URLSearchParams({
    q: username,
  });

  const response = await fetch(`${GITHUB_API_URL}/search/users?${params}`);
  const { items } = await response.json();

  return items;
};

export const getUser = async (login) => {
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

    return data;
  }
};
