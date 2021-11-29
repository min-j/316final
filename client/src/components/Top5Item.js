import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [draggedTo, setDraggedTo] = useState(0);
    const [text, setText] = useState("");

    function handleDragStart(event, targetId) {
        event.dataTransfer.setData("item", targetId);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        // console.log("entering");
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        // console.log("leaving");
        setDraggedTo(false);
    }

    function handleDrop(event, targetId) {
        event.preventDefault();
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        console.log("handleDrop (sourceId, targetId): ( " + sourceId + ", " + targetId + ")");

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }
    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }
        setEditActive(newActive);
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("item-".length);
            store.addUpdateItemTransaction(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let { index } = props;

    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }
    let cardElement = 
        <ListItem
            id={'item-' + (index)}
            key={props.key}
            className={itemClass}
            onDragStart={(event) => {
                handleDragStart(event, (index))
            }}
            onDragOver={(event) => {
                handleDragOver(event, (index))
            }}
            onDragEnter={(event) => {
                handleDragEnter(event, (index))
            }}
            onDragLeave={(event) => {
                handleDragLeave(event, (index))
            }}
            onDrop={(event) => {
                handleDrop(event, (index))
            }}
            draggable="true"
            sx={{ display: 'flex', p: 1 }}
            style={{
                fontSize: '48pt',
                width: '100%'
            }}
        >
        <Box sx={{ p: 1 }}>
            <IconButton onClick={handleToggleEdit} aria-label='edit'>
                <EditIcon style={{fontSize:'48pt'}}  />
            </IconButton>
        </Box>
            <Box sx={{ p: 1, flexGrow: 1 }}>{props.text}</Box>
        </ListItem>;
    if (editActive) {
        cardElement = 
            <TextField
                id={'item-' + (index)}
                className={itemClass}
                label="Top 5 List Item"
                required
                fullWidth
                defaultValue={props.text}
                autoFocus
                inputProps={{style: {fontSize: '48pt'}}}
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
            />
    }
    return (
        cardElement
    )
}

export default Top5Item;