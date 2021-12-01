import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button, List, ListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Copyright from './Copyright'

export default function WelcomeScreen() {
    return (
        <div id="welcome-screen">
            <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40%',
            }}
            >
            <Paper 
                sx={{
                    p: 3,
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                <Typography component="h1" variant="h4">
                    Welcome to T<sup>5</sup>L
                </Typography>
                <Typography variant="body1">
                    A website where users can create, view, and rate Top 5 Lists of any topic around the world!
                </Typography>
                <List>
                    <ListItem>
                        <Button 
                        fullWidth
                        component={Link} to="/login"
                        variant="contained">
                            Login
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button 
                        fullWidth
                        variant="contained">
                            Continue as Guest
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button 
                        fullWidth
                        component={Link} to="/register"
                        variant="contained">
                            Register
                        </Button>
                    </ListItem>
                </List>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
                    Jonathan Min
                </Typography>
                <Copyright />
            </Paper>
            </Box>
        </div>
    );
}