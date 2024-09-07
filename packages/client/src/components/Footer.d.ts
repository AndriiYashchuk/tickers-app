import React from 'react';
interface Props {
    email?: string;
    phone?: string;
    author?: {
        link: string;
        name: string;
    };
}
export declare const Footer: ({ email, phone, author }: Props) => React.JSX.Element;
export {};
