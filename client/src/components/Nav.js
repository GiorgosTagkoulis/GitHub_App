import React from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #1cbc2c;
`;

const Anchor = styled.a`
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  &:hover {
    background-color: green;
  }
`;

const Nav = (props) => {
  const handleClick = (e) => {
    props.callback(e.currentTarget.dataset.id);
  };

  return (
    <Ul>
      <Anchor onClick={handleClick} data-id="1">
        Followers
      </Anchor>
      <Anchor onClick={handleClick} data-id="2">
        Following
      </Anchor>
      <Anchor onClick={handleClick} data-id="3">
        Repos
      </Anchor>
    </Ul>
  );
};

export default Nav;
