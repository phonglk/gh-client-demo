# Introduction

This application allows user to search github profiles by keywords. Then user can view the specific profiles with basic profile info: name, company, location, github. The profile view also list first 30 repositories as well as followers, following.

# Technical Features
- Single Page App
- Stateful URL: Able to copy the url to share the current view
- React + Redux ( + Thunk )
- Responsive
- LESS
- DLL for fast build and caching
- Code Splitting per Page

# Limitation

- Search is restricted at page 34
- List of repositories, followers, following are limited to first 30

# Development

- Must build DLL for either development or production
- Typical first development build: build dll && build dev && serve
- Typical first production build: build dll && build production && serve

## Build DLL
`npm run dll`
## Development
`npm run dev`
## Production build
`npm run production`
## Serve
`npm run serve`

##TODOS

[x] Search
[X] Search Loader
[x] List
[X] List Loader
[x] Profile
[X] Profile Loader
[x] Responsive
[ ] Adv
[X] Code Spliting
[ ] Server rendering
[ ] ServiceWorker
