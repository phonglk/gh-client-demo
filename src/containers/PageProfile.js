import React from 'react';
import { connect } from 'react-redux';

import PageProfile from '../components/PageProfile';
import { profileRequest } from '../actions';

class ConPageProfile extends PageProfile {
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params
      && nextProps.match.params.username
      && (!this.props.match.params.username 
        || nextProps.match.params.username !== this.props.match.params.username
      )
    ) {
      this.requestProfile(nextProps.match.params.username);
    }
  }

  componentWillMount() {
    if (this.props.match.params && this.props.match.params.username) {
      this.requestProfile(this.props.match.params.username);
    }
  }

  requestProfile(username) {
    this.props.profileRequest(username);
  }
}

export default connect((state) => {
  return state.profile; 
}, {
  profileRequest
})(ConPageProfile)