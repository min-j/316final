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

    if (store.currentList)
        text = store.currentList.name;
    return (
        <div id="top5-statusbar">
            {/* <Typography variant="h4">{text}</Typography> */}
            {/* <div id="list-selector-heading"> */}
            <Fab 
                aria-label="add"
                id="add-list-button"
                size="medium"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h3">Your Lists</Typography>
            {/* </div> */}
        </div>
    );
}

export default Statusbar;