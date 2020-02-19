import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Photographers from './Photographers';
import Albums from './Albums';
import Photos from './Photos';
import Container from '@material-ui/core/Container';

function App() {
  const [cachedAlbums, setCachedAlbums] = useState({})
  const [cachedPhotos, setCachedPhotos] = useState({})

  function handleFetchAlbums(id, albums) {
    let _albums = cachedAlbums;
    _albums[id] = albums;

    setCachedAlbums(_albums);
  }

  function handleFetchPhotos(id, photos) {
    let _photos = cachedPhotos;
    _photos[id] = photos;

    setCachedPhotos(_photos);
  }

  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/album/:id">
            <Photos photos={cachedPhotos} onFetchPhotos={handleFetchPhotos} />
          </Route>
          <Route path="/photographer/:id">
            <Albums albums={cachedAlbums} onFetchAlbums={handleFetchAlbums} />
          </Route>
          <Route path="/">
            <Photographers />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
