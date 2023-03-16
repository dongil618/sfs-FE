import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function Loading( props ) {

    const open = props.open;
    const theme = props.theme;

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: theme.zIndex.drawer - 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}