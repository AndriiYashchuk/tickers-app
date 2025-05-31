import React from 'react';
import { User } from '@tickers-app/common/types/User';
import { Link } from '../../types/Link';

export interface Props {
  links: Link []
  onClick?: (selected: Link) => void
  logo?: Link,
  user?: User | null,
  usersMenu?: Link [];
  onUserClick?: (user: User) => void;
  isRenderFromSSR?: boolean;
  isLoading?: boolean
  isMobile?: boolean;
}

export interface DynamicProps extends Props{
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isOpen?: boolean;
  anchorEl?: any;
  handleClose?: (link: Link) => void;
  isMobile?: boolean;
}
