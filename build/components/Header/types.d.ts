import { User } from '@tickers-app/common/types/User';
import { Link } from '../../types/Link';
export interface Props {
    links: Link[];
    onClick?: (selected: Link) => void;
    logo?: Link;
    user?: User;
    usersMenu?: Link[];
    onUserClick?: (user: User) => void;
    isRenderFromSSR?: boolean;
}
