import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 2em;
  diplay: flex;
  flex-direction: column;
`;

const Li = styled.li`
  list-style-type: none;
`;

const ListItems = (props) => {
    return (
      <Wrapper>
        <ul>
          {
            props.items[props.tab].map(item => 
              <Li key={props.items[props.tab].indexOf(item)}>{item}</ Li>
            )
          }
        </ul>
      </Wrapper>
    )
}

export default ListItems;
