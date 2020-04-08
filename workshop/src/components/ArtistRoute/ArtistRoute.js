import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  requestAllArtistInfo,
  receiveArtistProfile,
  receiveRelatedArtists,
  receiveTopTracks,
  finishReceivingAllArtistInfo,
  receiveArtistError,
} from '../../actions';
import { getArtist, getArtistStatus } from '../../reducers/artists.reducer';
import { getAccessToken } from '../../reducers/auth.reducer';
import {
  fetchRelatedArtists,
  fetchArtistProfile,
  fetchTopTracks,
} from '../../helpers/api.helpers';

import FullScreenSpinner from '../FullScreenSpinner';

import Header from './Header';
import TopTracks from './TopTracks';
import GenreTags from './GenreTags';
import RelatedArtists from './RelatedArtists';
// import DEFAULT_ARTIST_ID from '../App';


// const ArtistRoute = () => {
//   const accessToken = useSelector(state => state.auth.token);

//   const artistId = '6ztZs0FOUv1FqwSxsj11R3';

//   fetchArtistProfile(accessToken, artistId)

//   // render something
//   ArtistRoute()
// };


const ArtistDetailsContainer = () => {
  const artist = useSelector(getArtist);
  const artistStatus = useSelector(getArtistStatus);

  useSpotifyData();

  if (artistStatus === 'loading') {
    return <FullScreenSpinner />;
  }

  if (!artist) {
    // SOmething's gone wrong!
    return 'Error';
  }
  console.log('artist', artist);
  return (

    <>
      <Section>
        <Header
          photoSrc={artist.profile.images[1].url}
          name={artist.profile.name}
          followerCount={artist.profile.followers.total}
        />
      </Section>
      <Section>
        {artist.topTracks && <TopTracks tracks={artist.topTracks} />}
      </Section>
      <Section>
        {artist.profile.genres && <GenreTags genres={artist.profile.genres} />}
      </Section>
      <Section>
        {artist.relatedArtists && (
          <RelatedArtists artists={artist.relatedArtists} />
        )}
      </Section>
    </>
  );
};

const useSpotifyData = () => {
  const { artistId } = useParams();

  const dispatch = useDispatch();

  const accessToken = useSelector(getAccessToken);

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }

    dispatch(requestAllArtistInfo());

    const artistProfilePromise = fetchArtistProfile(accessToken, artistId).then(
      json => {
        dispatch(receiveArtistProfile(json));
      }
    );

    const relatedArtistsPromise = fetchRelatedArtists(
      accessToken,
      artistId
    ).then(json => {
      dispatch(receiveRelatedArtists(json));
    });

    const topTracksPromise = fetchTopTracks(accessToken, artistId).then(
      json => {
        dispatch(receiveTopTracks(json));
      }
    );

    Promise.all([artistProfilePromise, relatedArtistsPromise, topTracksPromise])
      .then(() => dispatch(finishReceivingAllArtistInfo()))
      .catch(err => {
        console.error(err);
        dispatch(receiveArtistError(err));
      });
  }, [accessToken, artistId]);
};

const Section = styled.section`
  margin-bottom: 64px;
`;

export default ArtistDetailsContainer;
