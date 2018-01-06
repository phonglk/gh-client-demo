import React, { PureComponent } from 'react'

const DisplayProfile = profile => {
  if (profile === null) return null;
  return (
    <div className="profile-info">
      <div className="profile-info__basic">
        <div className="profile-info__avatar">
          <img src={profile.avatar_url} />
        </div>
        <div className="profile-info__basic-detail">
          <div>
            <a href={profile.html_url} target="_blank">
              {profile.html_url}
            </a>
          </div>
          <div>{profile.name}</div>
          <div>{profile.location}</div>
          <div>{profile.company}</div>
        </div>
      </div>
    </div>
  )
}

class PageProfile extends PureComponent {
  render () {
    const { isLoading, username, profile, repos, following, followers } = this.props;
    return (
      <div>
        <h1>Profile: {username}</h1>
        <div>
          <div></div>
        </div>
      </div>
    )
  }
}

export default PageProfile