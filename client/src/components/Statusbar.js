import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleCreateNewList() {
        store.createNewList();
    }
    let statusbar = ""
    if (store.showHome) {
        statusbar = 
            <div id="top5-statusbar">
            {/* <Typography variant="h4">{text}</Typography> */}
                <Fab 
                    aria-label="add"
                    id="add-list-button"
                    size="medium"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                <Typography variant="h3">Your Lists</Typography>
            </div>
    }
    if (store.showAll) {
        statusbar =
            <div id="top5-statusbar">
                <Typography variant="h4">Lists By Title</Typography>
            </div>
    }
    else if (store.showUsers) {
        statusbar =
            <div id="top5-statusbar">
                <Typography variant="h4">Lists By Username</Typography>
            </div>
    }
    else if (store.showCommunity) {
        statusbar =
            <div id="top5-statusbar">
                <Typography variant="h4">Community Lists</Typography>
            </div>
    }
    if (store.search) {
        statusbar = 
            <div id="top5-statusbar">
                <Typography variant="h4">{store.search} Lists</Typography>
            </div>
    }
    return (
        statusbar
    );
}

export default Statusbar;