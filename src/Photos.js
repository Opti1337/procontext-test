import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import GoBackButton from './GoBackButton';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Photos(props) {
    const PHOTOS_PER_PAGE = 10
    const { id } = useParams();
    const initialPhotos = props.photos[id] ? props.photos[id] : [];
    const [page, setPage] = useState(1);
    const [photos, setPhotos] = useState(initialPhotos);
    useEffect(() => {
        if (!props.photos[id]) {
            fetch('https://jsonplaceholder.typicode.com/photos/?albumId=' + id)
                .then(response => response.json())
                .then(result => {
                    setPhotos(result);
                    props.onFetchPhotos(id, result);
                });
        }
    }, []);

    return (
        <>
            <Box mb={2}>
                <GoBackButton />
            </Box>
            <GridList cellHeight={150} cols={5} style={{width: '750px', margin: '0 auto'}}>
                {photos.slice(0, page * PHOTOS_PER_PAGE).map(photo => (
                    <GridListTile key={photo.id}>
                        <img src={photo.thumbnailUrl} alt={photo.title} />
                        <GridListTileBar
                            title={photo.title}
                        />
                    </GridListTile>
                ))}
            </GridList>
            {photos.length > PHOTOS_PER_PAGE * page &&
                <Box mt={2}>
                    <Button variant="contained" color="primary" startIcon={<ExpandMoreIcon />} onClick={() => setPage(page + 1)}>ДАЙ МНЕ ЕЩЕ, СУКА</Button>
                </Box>
            }
        </>
    );
}

export default Photos;