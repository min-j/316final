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
    let text ="";

    function handleCreateNewList() {
        store.createNewList();
    }
    let statusbar = 
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
    // might have to be auth to check if a user is logged in instead
    if (store.currentList)
        // text = store.currentList.name;
        statusbar = <div id="top5-statusbar"></div>
    return (
        statusbar
    );
}

export default Statusbar;