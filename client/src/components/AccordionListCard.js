import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ListItem } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import TextField from '@mui/material/TextField';
import AuthContext from '../auth';
import Comment from './Comment';

export default function AccordionListCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { top5list } = props;

    function handleEditList(event, id) {
        event.stopPropagation();
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleLike(event, id) {
        event.stopPropagation();
        store.like(id);
    }

    function handleDislike(event, id) {
        event.stopPropagation();
        store.dislike(id);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function updateViewCount(event, id) {
        event.stopPropagation();
        store.viewedList(id)
    }

    function handleComment(event, id) {
        if (event.key == "Enter") {
            store.comment(id, document.getElementById("comment " + top5list._id).value)
            document.getElementById("comment " + top5list._id).value = ""
        }
    }

    let editvisible = 'visible'
    if (auth.user !== null) {
        if (auth.user.userName !== top5list.userName) {
            editvisible = 'hidden'
        }
    }
    if (auth.guest) {
        editvisible = 'hidden'
    }

    let like = <ThumbUpOutlinedIcon />;
    if (top5list.likes.includes(auth.user.userName)) {
        like = <ThumbUpIcon />
    }
    let dislike = <ThumbDownOutlinedIcon />;
    if (top5list.dislikes.includes(auth.user.userName)) {
        dislike = <ThumbDownIcon />
    }

    let title = top5list.name;
    let items = top5list.items;
    if (store.showHome) {
        title = top5list.savedName;
        items = top5list.savedItems;
    }

    let comments = ""
    if (top5list.comments) {
        comments = 
            <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
            {
                top5list.comments.reverse().map((c, index) => (
                    <Comment 
                        comment={c}
                        key={index}
                    />
                ))
            }
            </List>;
    }

    return (
        <ListItem 
            id={top5list._id}
            key={top5list._id}
            sx={ {paddingTop: 0} }
        >
        <Accordion 
            sx={ {width:'100%'}} 
            onChange={
                (event, expanded) => {
                    if (expanded) {
                        updateViewCount(event, top5list._id)
                    }
                }}
        >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        {/* <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box> */}
                        <Typography sx={ {fontSize:30} }>
                            {title}
                        </Typography>
                    </Grid> 
                    <Grid item xs={1}>
                        <IconButton 
                            aria-label="edit"
                            sx = { {visibility: editvisible} }
                            onClick={(event) => {handleEditList(event, top5list._id)}}
                        >
                            <EditOutlinedIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton 
                            aria-label="like"
                            onClick={(event) => {handleLike(event, top5list._id)}}
                        >
                            { like }
                            {top5list.likes.length}
                        </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton 
                            aria-label="dislike"
                            onClick={(event) => {handleDislike(event, top5list._id)}}
                        >
                            { dislike }
                            {top5list.dislikes.length}
                        </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton 
                            onClick={(event) => {handleDeleteList(event, top5list._id)}}
                            sx = { {visibility: editvisible} } 
                            aria-label='delete'>
                            <DeleteOutlinedIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="caption">By: {top5list.userName}</Typography>
                    </Grid>
                    <Grid item xs={6} sx={ {textAlign: 'right'} }>
                        <Typography variant="caption">Views: {top5list.views}</Typography>
                    </Grid>
                </Grid>
            </Box>
            </AccordionSummary>
            <AccordionDetails sx={ {bgcolor: 'lavender'} }>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={ {border: '1px black' } }>
                            <Grid container spacing={2}>
                                <Grid item xs={1}>
                                    <Typography variant="h4"> 1. </Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography variant="h4"> { items[0]} </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h4"> 2. </Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography variant="h4"> { items[1]} </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h4"> 3. </Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography variant="h4"> { items[2]} </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h4"> 4. </Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography variant="h4"> { items[3]} </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="h4"> 5. </Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography variant="h4"> { items[4]} </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx = {{
                                display: 'flex', 
                                flexDirection: 'column',
                                overflow: 'scroll',
                                height: '250px',
                            }}
                        >
                            { 
                                comments 
                            }
                        </Box>
                        <TextField 
                            id= {"comment " + top5list._id}
                            label="Add Comment" 
                            variant="outlined"
                            fullWidth
                            onKeyPress={(event) => {handleComment(event, top5list._id)}}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
        </ListItem>
    );
}
