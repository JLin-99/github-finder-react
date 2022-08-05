import axios from "axios";
const GITHUB_API_URL = process.env.REACT_APP_GITHUB_URL;

const github = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {}, // Can add Authorization token if want to
});

export const searchUsers = async (username) => {
  const params = new URLSearchParams({
    q: username,
  });

  // const response = await fetch(`${GITHUB_API_URL}/search/users?${params}`);
  // const { items } = await response.json();
  const response = await github.get(`/search/users?${params}`);

  return response.data.items;
};

export const getUserWithFetch = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });

  const [user, user_repos] = await Promise.all([
    fetch(`${GITHUB_API_URL}/users/${login}`),
    fetch(`${GITHUB_API_URL}/users/${login}/repos?${params}`),
  ]);

  if (user.status === 404) {
    window.location = "/notfound";
  } else {
    const data = await user.json();
    data.repos = await user_repos.json();

    return data;
  }
};

export const getUser = async (username) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });

  const [user, repos] = await Promise.all([
    github.get(`/users/${username}`),
    github.get(`/users/${username}/repos?${params}`),
  ]);

  user.data.repos = repos.data;

  return user.data;
};
