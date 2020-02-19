import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function GoBackButton() {
    const history = useHistory();

    return (
        <Button variant="contained" color="primary" onClick={() => history.goBack()}>НАЗААААААААД</Button>
    );
}

export default GoBackButton;