import * as React from 'react';
import { useState } from 'react';
import { HeaderStatic } from './Header.static';
export const Header = ({ links, user, onClick, logo, usersMenu, onUserClick, isLoading, }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (link) => {
        setAnchorEl(null);
        onClick(link);
    };
    return (<HeaderStatic links={links} user={user} logo={logo} onClick={onClick} anchorEl={anchorEl} isOpen={isOpen} usersMenu={usersMenu} onUserClick={onUserClick} handleClick={handleClick} handleClose={handleClose} isLoading={isLoading}/>);
};
