import React, { useState, useEffect } from 'react';
import {
    Link
} from "react-router-dom";
import List from '@material-ui/core/List';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

function Photographers() {
    const [photographers, setPhotographers] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(result => setPhotographers(result))
    }, []);

    return (
        <List>
            {photographers.map(photographer =>
                <ListItem component={Link} button key={photographer.id} to={'/photographer/' + photographer.id}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={photographer.name} />
                </ListItem>
            )}
        </List>
    );
};

export default Photographers;