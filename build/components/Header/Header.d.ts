import * as React from 'react';
import { User } from '@tickers-app/common/types/User';
import Link from '@mui/material/Link';
interface Link {
    title: string;
    to?: string;
    key?: string;
    icon?: any;
}
interface Props {
    links: Link[];
    onClick: (selected: Link) => void;
    logo?: Link;
    user?: User;
}
export declare const Header: ({ links, user, onClick, logo }: Props) => React.JSX.Element;
export {};
