import { Box } from '@mui/system';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store/index.js'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Navigation from './Navigation';

export default function Workspace() {
    const { store } = useContext(GlobalStoreContext);

    // console.log(store.currentList)

    const handlePublish = (event) => {
        event.preventDefault();
        let data = {
            name: document.getElementById('item-name').value,
            list: [document.getElementById('item-0').value,
                    document.getElementById('item-1').value,
                    document.getElementById('item-2').value,
                    document.getElementById('item-3').value,
                    document.getElementById('item-4').value]
        }
        store.editCurrentList(data)
    }

    return (
        <Box>
            <Navigation />
            <TextField 
                id="item-name" 
                label="Top 5 List Name" 
                variant="outlined" 
                defaultValue={store.currentList.name}
                required
                sx ={{m:3, marginLeft:10}}
            />
            <Box>
                <Box sx={{width:'90%', margin: '0 auto'}} >
                    <Grid container spacing={2}>
                            <Grid item xs={1}>
                                <Typography variant="h4"> 1. </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    id={'item-' + 0}
                                    label="Top 5 List Item"
                                    required
                                    fullWidth
                                    defaultValue={store.currentList.items[0]}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant="h4"> 2. </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    id={'item-' + 1}
                                    label="Top 5 List Item"
                                    required
                                    fullWidth
                                    defaultValue={store.currentList.items[1]}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant="h4"> 3. </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    id={'item-' + 2}
                                    label="Top 5 List Item"
                                    required
                                    fullWidth
                                    defaultValue={store.currentList.items[2]}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant="h4"> 4. </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    id={'item-' + 3}
                                    label="Top 5 List Item"
                                    required
                                    fullWidth
                                    defaultValue={store.currentList.items[3]}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant="h4"> 5. </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    id={'item-' + 4}
                                    label="Top 5 List Item"
                                    required
                                    fullWidth
                                    defaultValue={store.currentList.items[4]}
                                />
                            </Grid>
                            <Grid item xs={8}></Grid>
                            <Grid item xs={2}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                >
                                    Save
                                </Button>
                            </Grid>
                            <Grid item xs={2}>
                            <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={(event) => {handlePublish(event)}}
                                >
                                    Publish
                                </Button>
                            </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}