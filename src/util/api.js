export const search = (query, page = 1) => 
  fetch(`https://api.github.com/search/users?q=${query}&page=${page}`)
    .then(resp => resp.json())

export const user = (username) => 
  fetch(`https://api.github.com/users/${username}`)
    .then(resp => resp.json())

export const repos = (username) => 
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(resp => resp.json())

export const followers = (username) => 
  fetch(`https://api.github.com/users/${username}/followers`)
    .then(resp => resp.json())

export const following = (username) => 
  fetch(`https://api.github.com/users/${username}/following`)
    .then(resp => resp.json())