import React from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from '../../actions';

import ArtistRoute from '../ArtistRoute';
import MaxWidthWrapper from '../MaxWidthWrapper';
import GlobalStyles from '../GlobalStyles';

const DEFAULT_ARTIST_ID = '6ztZs0FOUv1FqwSxsj11R3';

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(requestAccessToken());
    fetch('/spotify_access_token')
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch((err) => {
        console.error(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);


  return (
    <Router>
      <MaxWidthWrapper>
        <Switch>
          <Route path="/artist/:artistId">
            <ArtistRoute />
          </Route>
          <Redirect to={`/artist/${DEFAULT_ARTIST_ID}`} />
        </Switch>
      </MaxWidthWrapper>TODO
      <GlobalStyles />
    </Router>
  );
};

export default App;
