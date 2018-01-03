import React, { PureComponent } from 'react';
import SearchInput from '../containers/SearchInput';

class PageSearch extends PureComponent {
  state = {
    query: '',
  }
  handleInputChange = (e) => {
    const query = e.target.value;
    this.setState({ query });
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    console.log(query)
    return false;
  }
  render () {
    return (
      <div>
        <h1>Search</h1>
        <div>
          <SearchInput />
        </div>
      </div>
    )
  }
}

export default PageSearch