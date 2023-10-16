import * as React from 'react';
import { Props } from './types';
import { Link } from '../../types/Link';
interface DynamicProps {
    handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isOpen?: boolean;
    anchorEl?: any;
    handleClose?: (link: Link) => void;
}
export declare const HeaderStatic: ({ logo, links, user, onClick, handleClick, isOpen, handleClose, anchorEl, usersMenu, onUserClick }: Props & DynamicProps) => React.JSX.Element;
export {};
