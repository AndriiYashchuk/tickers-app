import * as React from 'react';
interface Props {
    buttons: string[];
    onClick: (selected: string) => void;
    user?: {
        name: string;
        surname: string;
    };
}
export declare const Header: ({ buttons, user, onClick }: Props) => React.JSX.Element;
export {};
