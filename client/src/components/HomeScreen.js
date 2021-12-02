import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import AccordionListCard from './AccordionListCard.js'
import List from '@mui/material/List';
import { DeleteModal } from '.';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadAllLists();
    }, []);

    let listCard = "";
    if (store) {
        // left: '5%', bgcolor: 'background.paper'
        listCard = 
            <List sx={{ width: '100%',  }}>
            {
                store.allLists.map((entry) => (
                    <AccordionListCard
                        key={entry._id}
                        top5list={entry}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            <DeleteModal />
        </div>)
}

export default HomeScreen;