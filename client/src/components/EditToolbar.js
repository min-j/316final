import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleClose() {
        store.closeCurrentList();
    }
    // let editStatus = false;
    // if (store.currentList) {
    //     editStatus = true;
    // }
    return (
        <div id="edit-toolbar">
            <Button 
                // disabled={editStatus}
                id='close-button'
                onClick={handleClose}
                variant="contained"
                color="error">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;