import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/system/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useState } from 'react';
import { generateAvatarColor } from '../../utils/generateAvatarColor';

interface Link {
  title: string,
  to?: string,
  key?: string,
  icon?: any
}

interface Props {
  links: Link []
  onClick: (selected: Link) => void
  logo?: Link,
  user?: { name: string, surname: string }
}

export const Header = ({
  links,
  user,
  onClick,
  logo
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const filteredLogin = links.filter(({ title}) => !!user
    ? title !== 'Login'
    : true
  )

  return (
    <AppBar position={'static'}>
      <Toolbar>
        {logo && (
            <IconButton
              onClick={() => onClick(logo)}
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
              <Link
                underline={'none'}
                href={logo.to}
                color={"inherit"}
              >
              {logo.title}
              </Link>
            </Typography>
          )
        }
        <Stack
          direction={"row"}
          spacing={2}
        >
          {filteredLogin.map(({ title, key, to  }) => (
              <Link
                href={to}
                style={{
                  textAlign: 'center',
                  padding: '6px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
                sx={{ paddingLeft: '16px'}}
                variant="subtitle2"
                underline="hover"
                component={to ? "a" : "button"}
                key={key || title || to}
                color={"inherit"}
                onClick={() => onClick({ title, key, to })}
              >
                {title.toUpperCase()}
              </Link>)
          )}
          {user && (
            <Button
              id='avatar-button'
              onClick={handleClick}
              aria-controls={isOpen ? 'avatar-menu' : undefined}
              aria-haspopup={'true'}
              aria-expanded={isOpen || undefined}
//            endIcon={<KeyboardArrowDown color={"secondary"} />}
            >
            <Avatar {...generateAvatarColor(`${user.name} ${user.surname}`)} />
          </Button>)}
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
          <MenuItem onClick={handleClose}>{`${user.name} ${user.surname}`}</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>)}
      </Toolbar>
    </AppBar>
  )
}
