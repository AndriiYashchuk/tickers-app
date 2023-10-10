import * as React from 'react';
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
    user?: {
        name?: string;
        surname?: string;
        email: string;
    };
}
export declare const Header: ({ links, user, onClick, logo }: Props) => React.JSX.Element;
export {};
