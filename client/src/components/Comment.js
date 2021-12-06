import Typography from '@mui/material/Typography';
import { ListItem } from '@mui/material';
import Box from '@mui/material/Box';

export default function Comment(props) {
    const { comment } = props;

    return (
        <ListItem sx={{paddingTop: 0}}>
            <Box sx={ {border: 1, borderRadius: 2, p: 2, bgcolor:'#fff8cc',} } width='100%'>
                <Typography color="text.secondary" sx={{marginRight:1}}>
                    { comment[0] }
                </Typography>
                <Typography>
                    { comment[1] }
                </Typography>
            </Box>
        </ListItem>
    )
}