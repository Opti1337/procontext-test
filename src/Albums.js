import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import GoBackButton from './GoBackButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

function Albums(props) {
    const { id } = useParams();
    const initialAlbums = props.albums[id] ? props.albums[id] : [];
    const [searchQuery, setSearchQuery] = useState('');
    const [albums, setAlbums] = useState(initialAlbums);
    useEffect(() => {
        if (!props.albums[id]) {
            fetch('https://jsonplaceholder.typicode.com/albums/?userId=' + id)
                .then(response => response.json())
                .then(result => {
                    setAlbums(result);
                    props.onFetchAlbums(id, result);
                });
        }
    }, []);
    const filteredAlbums = albums.filter(album => {
        return new RegExp(searchQuery).test(album.title);
    });

    return (
        <>
            <Box mb={2}>
                <GoBackButton />
            </Box>
            <Box mb={2}>
                <TextField label="Search" variant="outlined" onChange={e => setSearchQuery(e.target.value)} />
            </Box>
            <List>
                {filteredAlbums.map(album =>
                    <ListItem component={Link} button key={album.id} to={'/album/' + album.id}>
                        <ListItemIcon>
                            <PhotoAlbumIcon />
                        </ListItemIcon>
                        <ListItemText primary={album.title} />
                    </ListItem>
                )}
            </List>
        </>
    );
}

export default Albums;