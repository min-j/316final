import { useContext, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import SortIcon from '@mui/icons-material/Sort';
import GlobalStoreContext from '../store'
import AuthContext from '../auth'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navigation() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleSortMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Publish Date (Newest)</MenuItem>
      <MenuItem onClick={handleMenuClose}>Publish Date (Oldest)</MenuItem>
      <MenuItem onClick={handleMenuClose}>Views</MenuItem>
      <MenuItem onClick={handleMenuClose}>Likes</MenuItem>
      <MenuItem onClick={handleMenuClose}>Dislikes</MenuItem>
    </Menu>
  );

  const handleHomeButton = () => {
    store.loadHomeLists()
    document.getElementById('search').value = ""
  }
  const handleAllButton = () => {
    store.loadAllLists()
    document.getElementById('search').value = ""
  }
  const handleUserButton = () => {
    store.loadUserLists()
    document.getElementById('search').value = ""
  }
  const handleCommunityButton = () => {
    store.loadCommunityLists()
    document.getElementById('search').value = ""
  }

  const handleSearch = () => {
    let query = document.getElementById('search').value
    if (store.showHome) {
      if (!query) {
        store.loadHomeLists()
      }
      else {
        store.loadHomeLists(query)
      }
    }
    else if (store.showAll) {
      if (!query) {
        store.loadAllLists()
      }
      else {
        store.loadAllLists(query)
      }
    }
    else if (store.showUsers) {
      if (!query) {
        store.loadUserLists()
      }
      else {
        store.loadUserLists(query)
      }
    }
    // else if (store.showCommunity) {
    //   if (!query) {
    //     store.loadCommunityLists()
    //   }
    //   else {
    //     store.loadCommunityLists(query)
    //   }
    // }
  }
  
  let buttondisabled = false
  if (store.currentList) {
    buttondisabled = true
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            id="home-button"
            disabled={store.currentList || auth.guest}
            onClick={(event) => handleHomeButton(event)}
          >
            <HomeOutlinedIcon />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            aria-label="all lists"
            id="all-button"
            disabled={buttondisabled}
            onClick={(event) => handleAllButton(event)}
          >
            <GroupsOutlinedIcon />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            aria-label="users"
            id="users-button"
            disabled={buttondisabled}
            onClick={(event) => handleUserButton(event)}
          >
            <PersonOutlinedIcon />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            aria-label="community lists"
            id="community-button"
            disabled={buttondisabled}
            onClick={(event) => handleCommunityButton(event)}
          >
            <FunctionsOutlinedIcon />
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              id="search"
              onInput={handleSearch}
              disabled={buttondisabled}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="sort by"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleSortMenuOpen}
              color="inherit"
              disabled={buttondisabled}
            >
                <SortIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}