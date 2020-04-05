import React, { Component } from 'react';
import Nav from './Nav';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
`;

const UpPart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DownPart = styled.div`
  margin-top: 2em;
  diplay: flex;
  flex-direction: column;
`;

const ImgWrap = styled.div`
  height: 50%;
  width: 50%;
`;

const Image = styled.img`
  max-width: 100%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

class User extends Component {
  state = {
    active: 1,
    resources: {
      followers: [],
      following: [],
      repos: [],
    },
  };

  activeTab = (id) => {
    this.setState({ active: id });
  };

  fetchResources = (endpoint) => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ resources: res });
      });
  };

  componentDidMount() {
    const endpoint = `/${this.props.details.username}`;
    this.fetchResources(endpoint);
  }

  render() {
    return (
      <Wrapper>
        <UpPart>
          <ImgWrap>
            <Image src={this.props.details.avatar_url} alt="GitHub avatar" />
          </ImgWrap>
          <Details>
            <BoldText>{this.props.details.name}</BoldText>
            <BoldText>
              <a href={this.props.details.html_url}>{this.props.details.html_url}</a>
            </BoldText>
            <BoldText>Followers: {this.props.details.followers}</BoldText>
            <BoldText>Following: {this.props.details.following}</BoldText>
            <BoldText>Public Repos: {this.props.details.public_repos}</BoldText>
          </Details>
        </UpPart>
        <DownPart>
          <Nav callback={this.activeTab} />
          {(() => {
            switch (this.state.active) {
              case 1:
                return (
                  <ul>
                    {this.state.resources.followers.map((follower) => (
                      <li key={this.state.resources.followers.indexOf(follower)}>{follower}</li>
                    ))}
                  </ul>
                );
              case 2:
                return (
                  <ul>
                    {this.state.resources.following.map((user) => (
                      <li key={this.state.resources.following.indexOf(user)}>{user}</li>
                    ))}
                  </ul>
                );
              case 3:
                return (
                  <ul>
                    {this.state.resources.repos.map((repo) => (
                      <li key={this.state.resources.repos.indexOf(repo)}>{repo}</li>
                    ))}
                  </ul>
                );
              default:
                return <p>List</p>;
            }
          })()}
        </DownPart>
      </Wrapper>
    );
  }
}

export default User;
