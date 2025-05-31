'use client';

import React from 'react';
import { generateAvatarColor } from '../../utils/generateAvatarColor';
import { DynamicProps } from './types';
import { HeaderMobile } from './HeaderMobile';
import { useIsMobile } from '../../hooks/use-is-mobile';
import { HeaderDesktop } from './HeaderDesktop';

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
  isMobile: isSSRMobile,
}: DynamicProps) => {
  const isMobileClient = useIsMobile();
  const isMobile = isMobileClient || isSSRMobile;

  const { name = '', surname = '', email = '' } = user || {};
  const isFullName = !!(name && surname);
  const avatarProps = isFullName
    ? generateAvatarColor(`${name} ${surname}`)
    : { children: `${email[0]}` };

  if (isMobile) {
    return (
      <HeaderMobile
        user={user}
        avatarProps={avatarProps}
        logo={logo}
        links={links}
        isRenderFromSSR={isRenderFromSSR}
        onClick={onClick}
        handleClick={handleClick}
        isOpen={isOpen}
        isLoading={isLoading}
        isFullName={isFullName}
        surname={surname}
        email={email}
        usersMenu={usersMenu}
        handleClose={handleClose}
        name={name}
      />);
  }

  return (
    <HeaderDesktop
      logo={logo}
      isRenderFromSSR={isRenderFromSSR}
      onClick={onClick}
      links={links}
      user={user}
      handleClick={handleClick}
      isOpen={isOpen}
      avatarProps={avatarProps}
      isLoading={isLoading}
      anchorEl={anchorEl}
      handleClose={handleClose}
      onUserClick={onUserClick}
      surname={surname}
      email={email}
      isFullName={isFullName}
      name={name}
      usersMenu={usersMenu}
    />
  );
};
