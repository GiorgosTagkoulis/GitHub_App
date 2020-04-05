import React, { Component } from 'react';
import styled from 'styled-components';
import User from './components/User';
import ErrorPage from './components/ErrorPage';

const Wrapper = styled.div`
  margin: 7em auto;
  text-align: center;
  max-width: 630px;
`;

const Header = styled.h1`
  font-family: 'rooney-web', 'AmericanTypewriter', Rockwell, serif;
  font-size: 2.5em;
  font-weight: bold;
`;

const InputText = styled.input.attrs({
  type: 'text',
  placeholder: 'Search GitHub user',
})`
  padding: 11px;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  max-width: -moz-available;
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
  };

  searchUsername = (username) => {
    const endpoint = `/search`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: username }),
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
      .catch((err) => {
        this.setState({ errorMessage: err.message });
      });
  };

  searchUser = (event) => {
    this.searchUsername(this.state.searchTerm);
    this.setState({ searchTerm: '' });
    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    return (
      <Wrapper>
        <Header>My GitHub App</Header>
        <form id="fundraise_form" onSubmit={this.searchUser}>
          <InputText value={this.state.searchTerm} onChange={this.handleChange} />
          <InputSubmit />
        </form>
        {this.state.userExists && <User details={this.state.user} />}
        {this.state.errorMessage && <ErrorPage error={this.state.errorMessage} />}
      </Wrapper>
    );
  }
}

export default App;
