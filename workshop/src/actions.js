

export const requestAccessToken = () => ({
    type: 'REQUEST_ACCESS_TOKEN',
});

export const receiveAccessToken = (token) => ({
    type: 'RECEIVE_ACCESS_TOKEN',
    token,
});

export const receiveAccessTokenError = () => ({
    type: 'RECEIVE_ACCESS_TOKEN_ERROR',
});

export const requestAllArtistInfo = () => ({
    type: 'REQUEST_ALL_ARTIST_INFO',
});

export const receiveArtistProfile = json => ({
    type: 'RECEIVE_ARTIST_PROFILE',
    profile: json,
});

export const receiveRelatedArtists = json => ({
    type: 'RECEIVE_RELATED_ARTISTS',
    relatedArtists: json.artists,
});

export const receiveTopTracks = json => ({
    type: 'RECEIVE_TOP_TRACKS',
    topTracks: json.tracks,
});

export const finishReceivingAllArtistInfo = () => ({
    type: 'FINISH_RECEIVING_ALL_ARTIST_INFO',
});

export const receiveArtistError = () => ({
    type: 'RECEIVE_ARTIST_ERROR',
});
