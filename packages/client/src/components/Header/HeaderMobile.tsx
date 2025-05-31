'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Button, Drawer,
  IconButton, List, ListItem, ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LinkComponent from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import Skeleton from '@mui/material/Skeleton';
import type { DynamicProps } from './types';

type Props = DynamicProps & {
  name: string;
  avatarProps: any;
  isFullName: boolean;
  surname: string;
  email: string;
}

export const HeaderMobile = ({
  logo,
  links,
  isRenderFromSSR,
  onClick,
  user,
  handleClick,
  isOpen,
  isLoading,
  usersMenu,
  handleClose,
  name,
  avatarProps,
  isFullName,
  surname,
  email,
}: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isUser = !!user;
  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  return (
    <>
      <AppBar position="static">
        <Toolbar>

          {logo && (
            <IconButton
              onClick={!isRenderFromSSR ? () => onClick && onClick(logo) : undefined}
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
            >
              {logo.icon || <TrendingUpIcon />}
            </IconButton>
          )}

          {logo?.title && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <LinkComponent underline="none" href={logo.to} color="inherit">
                {logo.title}
              </LinkComponent>
            </Typography>
          )}

          {!user && !isLoading && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>)}

          {user && (
            <Button
              size="small"
              id="avatar-button"
              onClick={!isRenderFromSSR ? toggleDrawer(true) : undefined}
              aria-controls={isOpen ? 'avatar-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isOpen || undefined}
            >
              <Avatar {...avatarProps} />
            </Button>
          )}

          {isLoading && (
            <Button size="small">
              <Skeleton variant="circular" width={40} height={40} />
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {user && (
            <>
              <ListItem button>
                <ListItemText
                  primary={isFullName ? `${name} ${surname}` : email}
                />
              </ListItem>
              {usersMenu && usersMenu.map(({ title, ...rest }) => (
                <ListItem
                  button
                  key={title}
                  onClick={() => handleClose && handleClose({ ...rest, title })}
                  style={{ justifyContent: 'center', textTransform: 'uppercase' }}
                >
                  <ListItemText primary={title} />
                </ListItem>
              ))}
            </>
          )}
          {links.map(({ title, key, to }) => (
            <ListItem
              button
              key={key || title}
              onClick={() => {
                if (onClick) onClick({ title, key, to });
                setDrawerOpen(false);
              }}
            >
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
