import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

const User = (props) => {
    return (
      <Wrapper>
        <ImgWrap>
          <Image src={props.details.avatar_url} alt="GitHub avatar" />
        </ ImgWrap>
        <Details>
          <BoldText>{props.details.name}</ BoldText>
          <BoldText>
            <a href={props.details.html_url}>{props.details.html_url}</a>
          </ BoldText>
          <BoldText>Followers: {props.details.followers}</ BoldText>
          <BoldText>Following: {props.details.following}</ BoldText>
          <BoldText>Public Repos: {props.details.public_repos}</ BoldText>
        </ Details>
      </ Wrapper>
    )
}

export default User;