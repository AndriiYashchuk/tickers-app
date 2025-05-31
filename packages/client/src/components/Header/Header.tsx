import * as React from 'react';
import { useState } from 'react';
import { Props } from './types';
import { HeaderStatic } from './Header.static';
import { Link } from '../../types/Link';

export const Header = ({
  links,
  user,
  onClick,
  logo,
  usersMenu,
  onUserClick,
  isLoading,
  isMobile,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (link: Link) => {
    setAnchorEl(null);
    if (onClick) {
      onClick(link);
    }
  };

  return (
    <HeaderStatic
      links={links}
      user={user}
      logo={logo}
      onClick={onClick}
      anchorEl={anchorEl}
      isOpen={isOpen}
      usersMenu={usersMenu}
      onUserClick={onUserClick}
      handleClick={handleClick}
      handleClose={handleClose}
      isLoading={isLoading}
      isMobile={isMobile}
    />
  );
};
