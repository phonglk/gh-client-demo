import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from './Spinner';

class UserList extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.object),
    emptyMessage: PropTypes.string,
  }

  static defaultProps = {
    isLoading: false,
    items: [],
    emptyMessage: 'There is no users',
  }

  render () {
    const { isLoading, items, emptyMessage, extras, extraLoadingUsername } = this.props;
    if (isLoading) return <Spinner medium />;
    if (items === null) return null;
    return (
      <ul className="user-list">
        {items.length === 0 && <span>{emptyMessage}</span>}
        {items.map(user => {
          const {login, id, avatar_url } = user;
          return (
            <li key={id} className="user-list__item">
              <Link className="user-list__item-container" to={`/profile/${login}`}>
                <div className="user-list__item-thumbnail" style={{
                  backgroundImage: `url(${avatar_url}`,
                }}>
                </div>
                <div className="user-list__item-username">
                  <div>{login}</div>
                  {extras && <div className="user-list__item-extras">
                    {extraLoadingUsername === login && <Spinner xsmall />}
                    {user.extras && <div>
                      <strong>Followers</strong>: {user.extras.followers} &nbsp;
                      <strong>Following</strong>: {user.extras.following}
                    </div>}
                  </div>}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default UserList;