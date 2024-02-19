import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/system/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { generateAvatarColor } from '../utils/generateAvatarColor';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
export const Header = ({ buttons, user, onClick }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (<AppBar position={'static'}>
      <Toolbar>
        <IconButton size={"large"} edge={"start"} color={"inherit"} aria-label={"logo"}>
          <TrendingUpIcon />
        </IconButton>
        <Typography variant={"h6"} component={"div"} sx={{ flexGrow: 1 }}>
          Tickers
        </Typography>
        <Stack direction={"row"} spacing={2}>
          {buttons.map((title) => (!!user && title === 'Login')
            ? null
            : (<Button key={title} color={"inherit"} onClick={() => onClick(title)}>
                {title}
              </Button>))}
          {user && (<Button id='avatar-button' onClick={handleClick} aria-controls={isOpen ? 'avatar-menu' : undefined} aria-haspopup={'true'} aria-expanded={isOpen || undefined} endIcon={<KeyboardArrowDown color={"secondary"}/>}>
            <Avatar {...generateAvatarColor(`${user.name} ${user.surname}`)}/>
          </Button>)}
        </Stack>
        {user && (<Menu id='avatar-menu' open={isOpen} anchorEl={anchorEl} MenuListProps={{
                'aria-labelledby': 'avatar-button'
            }} onClose={handleClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }} transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}>
          <MenuItem onClick={handleClose}>{`${user.name} ${user.surname}`}</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>)}
      </Toolbar>
    </AppBar>);
};
