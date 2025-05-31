import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu, MenuItem,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LinkComponent from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import type { DynamicProps } from './types';

type Props = DynamicProps & {
  name: string;
  avatarProps: any;
  isFullName: boolean;
  surname: string;
  email: string;
}

export const HeaderDesktop = ({
  logo,
  isRenderFromSSR,
  onClick,
  links,
  user,
  handleClick,
  isOpen,
  avatarProps,
  isLoading,
  anchorEl,
  handleClose,
  onUserClick,
  surname,
  email,
  isFullName,
  name,
  usersMenu,
}: Props) => {
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

          <Stack direction="row" spacing={2}>
            {links.map(({ title, key, to }) => (
              <LinkComponent
                key={key || title || to}
                href={to}
                sx={{ paddingLeft: '16px' }}
                variant="subtitle2"
                underline="hover"
                component={to ? 'a' : 'button'}
                color="inherit"
                onClick={
                  (!isRenderFromSSR && onClick)
                    ? () => onClick({ title, key, to })
                    : undefined
                }
              >
                {title.toUpperCase()}
              </LinkComponent>
            ))}
          </Stack>

          {user && (
            <Button
              size="small"
              id="avatar-button"
              onClick={!isRenderFromSSR ? handleClick : undefined}
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

      <Menu
        id="avatar-menu"
        open={!!isOpen}
        anchorEl={anchorEl}
        MenuListProps={{ 'aria-labelledby': 'avatar-button' }}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => onUserClick && onUserClick(user)}>
          {isFullName ? `${name} ${surname}` : email}
        </MenuItem>
        {usersMenu.map(({ title, ...rest }) => (
          <MenuItem
            key={title}
            onClick={() => handleClose && handleClose({ ...rest, title })}
            style={{ justifyContent: 'center', textTransform: 'uppercase' }}
          >
            {title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
