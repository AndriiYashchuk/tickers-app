import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/system/Stack';
import Button from '@mui/material/Button';
import LinkComponent from '@mui/material/Link';
import { generateAvatarColor } from '../../utils/generateAvatarColor';
import { Props } from './types';
import { Link } from '../../types/Link';

interface DynamicProps {
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  isOpen?: boolean;
  anchorEl?: any;
  handleClose?: (link: Link) => void
}


export const HeaderStatic = ({
  logo,
  links,
  user,
  onClick,
  handleClick,
  isOpen,
  handleClose,
  anchorEl,
  usersMenu = [],
  onUserClick,
  isRenderFromSSR = false,
  isLoading,
}: Props & DynamicProps) => {
  const { name = '', surname = '', email = '' } = user || {};
  const isFullName = !!(name && surname);
  const avatarProps = isFullName
    ? generateAvatarColor(`${name} ${surname}`)
    : { children: `${email[0]}` }

  return (
    <AppBar position={'static'}>
      <Toolbar>
        {logo && (
          <IconButton
            onClick={
              !isRenderFromSSR ?  () => onClick && onClick(logo): undefined
          }
            size={"large"}
            edge={"start"}
            color={"inherit"}
            aria-label={"logo"}
          >
            {logo.icon || <TrendingUpIcon />}
          </IconButton>)
        }
        {logo && logo.title && (
          <Typography
            variant={"h6"}
            component={"div"}
            sx={{ flexGrow: 1 }}
          >
            <LinkComponent
              underline={'none'}
              href={logo.to}
              color={"inherit"}
            >
              {logo.title}
            </LinkComponent>
          </Typography>
        )
        }
        <Stack
          direction={"row"}
          spacing={2}
        >
          {links.map(({ title, key, to  }) => (
            <LinkComponent
              href={to}
              style={{
                textAlign: 'center',
                padding: '6px 8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minWidth: '70px',
              }}
              sx={{ paddingLeft: '16px'}}
              variant="subtitle2"
              underline="hover"
              component={to ? "a" : "button"}
              key={key || title || to}
              color={"inherit"}
              onClick={
                !isRenderFromSSR ?  () => onClick({ title, key, to }) : undefined
              }
            >
              {title.toUpperCase()}
            </LinkComponent>)
          )}
          {user && (
            <Button
              id='avatar-button'
              onClick={!isRenderFromSSR && handleClick}
              aria-controls={isOpen ? 'avatar-menu' : undefined}
              aria-haspopup={'true'}
              aria-expanded={isOpen || undefined}
              //            endIcon={<KeyboardArrowDown color={"secondary"} />}
            >
              <Avatar  {...avatarProps} />
            </Button>)}
          {
            isLoading && (<Skeleton variant="circular" width={40} height={40} />)
          }
        </Stack>
        {user && (
          <Menu
            id='avatar-menu'
            open={isOpen}
            anchorEl={anchorEl}
            MenuListProps={{
              'aria-labelledby': 'avatar-button'
            }}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <MenuItem
              onClick={() => onUserClick && onUserClick(user)}
            >
              {(user.name && user.surname)
                ? `${user.name} ${user.surname}`
                : user.email
              }
            </MenuItem>
            {usersMenu.map(({ title, ...rest }) => (
              <MenuItem
                key={title}
                onClick={() => handleClose && handleClose({ ...rest, title })}
                style={{
                  justifyContent: 'center',
                  textTransform: 'uppercase'
                }}
              >
                {title}
              </MenuItem>
            ))}
          </Menu>)}
      </Toolbar>
    </AppBar>
  )
}
