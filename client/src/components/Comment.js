import Typography from '@mui/material/Typography';
import { ListItem } from '@mui/material';
import Card from '@mui/material/Card';

export default function Comment(props) {
    const { comment, key } = props;

    return (
        <ListItem
            key={key}
        >
            <Typography color="text.secondary">
                { comment[0] + ":"}
            </Typography>
            <Typography>
                { comment[1] }
            </Typography>
        </ListItem>
    )
}