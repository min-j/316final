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

import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import TextField from '@mui/material/TextField';

export default function AccordtionListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { top5list } = props;

    function handleEditList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    return (
        <ListItem 
            id={top5list._id}
            key={top5list._id}
            sx={ {paddingTop: 0} }
        >
        <Accordion sx={ {width:'100%'}}>
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
                            {top5list.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton 
                            aria-label="edit"
                            onClick={(event) => {handleEditList(event, top5list._id)}}
                        >
                            <EditOutlinedIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton 
                            aria-label="like"
                            onClick={(event) => {event.stopPropagation()}}
                        >
                            <ThumbUpOutlinedIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton 
                            aria-label="dislike"
                            onClick={(event) => {event.stopPropagation()}}
                        >
                            <ThumbDownOutlinedIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton onClick={(event) => {
                            handleDeleteList(event, top5list._id)
                            }} 
                            aria-label='delete'>
                            <DeleteOutlinedIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="caption">By: {top5list.ownerEmail}</Typography>
                    </Grid>
                    <Grid item xs={6} sx={ {textAlign: 'right'} }>
                        <Typography variant="caption">Views: number</Typography>
                    </Grid>
                </Grid>
            </Box>
            </AccordionSummary>
            <AccordionDetails sx={ {bgcolor: 'lavender'} }>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={ {border: '1px black', bgcolor: 'background.paper'} }>
                            <Typography variant="h4">
                                1. {top5list.items[0]}
                            </Typography>
                            <Typography variant="h4">
                                2. {top5list.items[1]}
                            </Typography>
                            <Typography variant="h4">
                                3. {top5list.items[2]}
                            </Typography>
                            <Typography variant="h4">
                                4. {top5list.items[3]}
                            </Typography>
                            <Typography variant="h4">
                                5. {top5list.items[4]}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx = {{
                                display: 'flex', 
                                flexDirection: 'column',
                                overflow: 'scroll',
                                height: '80%',
                            }}
                        >
                            <Box>COMMENTS</Box>
                            <Box>SHOULD BE</Box>
                            <Box>A COMPONENT</Box>
                        </Box>
                        <TextField 
                            id="outlined-basic" 
                            label="Add Comment" 
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
        </ListItem>
    );
}
