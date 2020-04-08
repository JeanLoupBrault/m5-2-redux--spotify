import produce from 'immer';

const initialState = {
    currentArtist: null,
    status: 'loading',
    error: null,
    // token: null,
    // status: 'idle',
};

// The 'type' for current artist will look like this:
// {
//   id: 'abc123',
//   profile: profile response,
//   topTracks: top tracks response,
//   relatedArtists: related artists response
// }


// export default function artitsReducer(state = initialState, action) {
//     switch (action.type) {
//         default: {
//             return state;
//         }
//     }
// }

export default function artists(state = initialState, action) {
    switch (action.type) {
        case 'REQUEST_ALL_ARTIST_INFO': {
            return {
                ...state,
                status: 'loading',
            };
        }

        case 'RECEIVE_ARTIST_PROFILE': {
            return produce(state, draftState => {
                if (!draftState.currentArtist) {
                    draftState.currentArtist = {};
                }
                draftState.currentArtist.id = action.profile.id;
                draftState.currentArtist.profile = action.profile;
            });
        }

        case 'RECEIVE_RELATED_ARTISTS': {
            return produce(state, draftState => {
                if (!draftState.currentArtist) {
                    draftState.currentArtist = {};
                }

                draftState.currentArtist.relatedArtists = action.relatedArtists;
            });
        }


        case 'RECEIVE_TOP_TRACKS': {
            return produce(state, draftState => {
                if (!draftState.currentArtist) {
                    draftState.currentArtist = {};
                }

                draftState.currentArtist.topTracks = action.topTracks;
            });
        }

        case 'RECEIVE_ARTIST_ERROR': {
            return {
                ...state,
                status: 'error',
            };
        }

        case 'FINISH_RECEIVING_ALL_ARTIST_INFO': {
            return {
                ...state,
                status: 'idle',
            };
        }
        default: {
            return state;
        }
    }
}

export const getArtist = state => state.artists.currentArtist;
export const getArtistStatus = state => state.artists.status;
