import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Heading from '../Heading';
import Avatar from '../Avatar';

const RelatedArtists = ({ artists }) => {
  return (
    <Wrapper>
      <Heading size="medium">Related Artists</Heading>
      <Row>
        {artists.map(artist => {
          console.log('artist', artist);
          return <RelatedArtist
            key={artist.id}
            id={artist.id}
            name={artist.name}
            imageUrl={
              artist.images.length > 0 ? artist.images[artist.images.length - 1].url : null}
          />
        })}
      </Row>
    </Wrapper>
  );
};

const RelatedArtist = ({ id, name, imageUrl }) => {
  const href = `/artist/${id}`;

  return (
    <ItemWrapper>
      <RelatedLink to={href}>
        <Avatar src={imageUrl} alt={`${name} artist photo`} size="small" />
        <Name size="small">{name}</Name>
      </RelatedLink>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.li`
  display: flex;
  flex-direction: column;
  margin: 0 16px;
`;

const RelatedLink = styled(Link)`
  text-decoration: none;
`;

const Name = styled(Heading)`
  margin-top: -16px;
  line-height: 1.2;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.ul`
  display: flex;
  padding: 0 32px;
  margin: 0;
  width: 100vw;
  overflow-x: auto;
`;

export default RelatedArtists;
