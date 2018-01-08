import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import UserList from './UserList';
import Spinner from './Spinner';

const DisplayProfile = props => {
  const { profile, isLoading } = props;
  if (profile === null) return null;
  return (
    <div className="profile-info">
      { isLoading
      ? <Spinner />
      : <div className="profile-info__basic">
          <div className="profile-info__avatar">
            <img src={profile.avatar_url} />
          </div>
          <div className="profile-info__basic-detail">
            <div>
              <i className="fa fa-github" /> <a href={profile.html_url} target="_blank">
                {profile.html_url}
              </a>
            </div>
            <div><i className="fa fa-user" /> {profile.name}</div>
            <div><i className="fa fa-location-arrow" /> {profile.location}</div>
            {profile.company && <div><i className="fa fa-building-o" /> {profile.company}</div>}
          </div>
        </div>
      }
    </div>
  )
}

const RepoList = props => {
  const { repos, username, isLoading } = props;

  return (
    <div className="repo-list">
      <h2>Repositories</h2>
      {isLoading || repos === null ? <Spinner /> : (
        repos.length === 0 ? <div>There is no repository</div>
        : <ul>
            {repos.map(repo => {
              const { name, description, html_url: url, id } = repo;
              return (
                <li className="repo-list__item" key={id}>
                  <a href={url} target="_blank">
                    <div className="repo-list__item-name">{name}</div>
                  </a>
                </li>
              )
            })}
            {repos.length === 30 && <li>
              <a href={`https://github.com/${username}?tab=repositories`} target="_blank">
                Please go to user's github page to see full list of repositories
              </a>
            </li>}
          </ul>
      )}
    </div>
  )
}

class PageProfile extends PureComponent {
  render () {
    const { isLoading, username, profile, repos, following, followers, search } = this.props;
    let searchLink = '/search';
    if (search.query !== '') {
      searchLink += `?q=${search.query}&page=${search.page}`
    }
    return (
      <div className="page page-profile">
        <h1><Link to={searchLink} className="btn">{'<'} <i className="fa fa-search" /></Link>Profile: {username}</h1>
        <div className="profile-and-repos">
          <DisplayProfile profile={profile} isLoading={isLoading} />
          <RepoList repos={repos} username={username} isLoading={isLoading} />
        </div>
        <div className="followers-and-following">
          <div className="profile-followers">
            <h2>Followers</h2>
            <UserList items={followers} emptyMessage="There is no followers" isLoading={isLoading} />
          </div>
          <div className="profile-following">
            <h2>Following</h2>
            <UserList items={following} emptyMessage="There is no following" isLoading={isLoading} />
          </div>
        </div>
      </div>
    )
  }
}

export default PageProfile