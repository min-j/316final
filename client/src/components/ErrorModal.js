import React, { useContext } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import AuthContext from "../auth";

export default function ErrorModal() {
    const { auth } = useContext(AuthContext);
    let message = ""
    if (auth.user !== null) {
        message = auth.user;
    }

    function handleClose() {
        auth.hideModal();
    }

    return (
        <div>
            <Modal
                open={auth.showModal}
                onClose={handleClose}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',}}>
                    <Alert severity="warning">{message}</Alert>
                </Box>
            </Modal>
        </div>
  );
}