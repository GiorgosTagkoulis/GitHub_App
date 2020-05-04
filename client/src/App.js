import React, { Component } from 'react';
import styled from 'styled-components';
import User from './components/User';
import Nav from './components/Nav';
import ListItems from './components/ListItems';
import ErrorPage from './components/ErrorPage';

const Wrapper = styled.div`
  margin: 7em auto;
  text-align: center;
  max-width: 630px;
`;

const UserWrapper = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  font-family: 'rooney-web', 'AmericanTypewriter', Rockwell, serif;
  font-size: 2.5em;
  font-weight: bold;
`;

const InputText = styled.input.attrs({
  type: 'text',
  placeholder: 'Search GitHub username',
})`
  padding: 11px;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  width: 60%;
`;

const InputSubmit = styled.input.attrs({
  type: 'submit',
  id: 'fundraise_pledgeButton',
  value: 'Search',
})`
  margin-top: 2px;
  padding: 12px;
  background-color: #1cbc2c;
  border: 0px;
  color: #fff;
  border-radius: 5px;
`;

class App extends Component {
  state = {
    searchTerm: '',
    userExists: false,
    errorMessage: '',
    user: null,
    activeTab: "followers",
    lists: {
      followers: [],
      following: [],
      repos: [],
    }
  };

  searchUsername = (username) => {
    const endpoint = `/search`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username }),
    };
    fetch(endpoint, requestOptions)
      .then((res) => {
        if (res.status === 404) {
          this.setState({ userExists: false, user: null });
          throw new Error('User not found');
        }
        if (res.status === 500) {
          this.setState({ userExists: false, user: null });
          throw new Error('There was a server Error');
        }
        return res.json();
      })
      .then((res) =>
        this.setState({
          userExists: true,
          errorMessage: '',
          user: res,
        })
      )
      .then(() => {
        const endpoint = `/${this.state.user.username}`;
        this.fetchResources(endpoint);
      })
      .catch((err) => {
        this.setState({ errorMessage: err.message });
      });
  };

  searchUser = (event) => {
    this.searchUsername(this.state.searchTerm);
    this.setState({ searchTerm: '' });
    event.preventDefault();
  };

  fetchResources = (endpoint) => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ lists: res });
      });
  };

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  activeTab = (id) => {
    this.setState({ activeTab: id });
  };

  render() {
    return (
      <Wrapper>
        <Header>My GitHub App</Header>
        <form id="fundraise_form" onSubmit={this.searchUser}>
          <InputText value={this.state.searchTerm} onChange={this.handleChange} />
          <InputSubmit />
        </form>
        {this.state.userExists ? 
          <UserWrapper>
            <User details={this.state.user} />
            <Nav callback={this.activeTab} />
            <ListItems tab={this.state.activeTab} items={this.state.lists} />
          </UserWrapper>
          : null
        }
        {this.state.errorMessage && <ErrorPage error={this.state.errorMessage} />}
      </Wrapper>
    );
  }
}

export default App;
