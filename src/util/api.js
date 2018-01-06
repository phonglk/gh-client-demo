const CLIENT_ID = '2a744fcae7f0118f2858';
const CLIENT_SECRET = '7c2ba401219029857c3e802d91b7fc3af2b30153';

const AUTH = `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

export const search = (query, page = 1) => 
  fetch(`https://api.github.com/search/users?q=${query}&page=${page}&${AUTH}`)
    .then(resp => resp.json())

export const user = (username) => 
  fetch(`https://api.github.com/users/${username}?${AUTH}`)
    .then(resp => resp.json())

export const repos = (username, page = 1) => 
  fetch(`https://api.github.com/users/${username}/repos?page=${page}&${AUTH}`)
    .then(resp => resp.json())

export const followers = (username) => 
  fetch(`https://api.github.com/users/${username}/followers?${AUTH}`)
    .then(resp => resp.json())

export const following = (username) => 
  fetch(`https://api.github.com/users/${username}/following?${AUTH}`)
    .then(resp => resp.json())

export const profile = (username) => 
    Promise.all([
      user(username),
      repos(username),
      followers(username),
      following(username),
    ])
      .then(([profile, repos, followers, following]) => ({
        profile, repos, followers, following
      }))