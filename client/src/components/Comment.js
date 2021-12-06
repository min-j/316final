import Typography from '@mui/material/Typography';
import { ListItem } from '@mui/material';
import Card from '@mui/material/Card';

export default function Comment(props) {
    const { comment } = props;

    return (
        <ListItem>
            <Typography color="text.secondary" sx={{marginRight:1}}>
                { comment[0] + ":"}
            </Typography>
            <Typography>
                { comment[1] }
            </Typography>
        </ListItem>
    )
}