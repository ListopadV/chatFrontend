import React, { FC } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {ErrorSnackbarProps} from "../../types";
import Typer from "./Typer";

const ErrorSnackbar: FC<ErrorSnackbarProps> = ({ snack, setSnack }) => {
    const handleCloseSnackbar = () => {
        setSnack({ ...snack, open: false });
    };
    return (
        <div>
            <Snackbar
                open={snack.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    <Typer isTypeByLetter={true} duration={2} text={snack.message} component={'p'}></Typer>
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ErrorSnackbar;
