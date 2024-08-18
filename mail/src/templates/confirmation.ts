import { getNameString } from '../utils/get-name-string';

interface Params {
  domain: string;
  name: string;
  token: string;
  userId: string;
}

export const getBody = ({ domain, name, token, userId }: Params): string => `
<h1 style="color: cornflowerblue;">
  Tickers app
</h1>
<h3>Email confirmation</h3>
<p style="font-weight: 400; font-size: 18px;">
  Hello${getNameString(
    name,
  )}, could you please confirm you email to have all access of application?
</p>
<a style="text-decoration: none;
background-color: #F45D09EA;
border-radius: 8px;
border-width: 0;
color: #ffffff;
cursor: pointer;
display: inline-block;
font-size: 14px;
font-weight: 500;
line-height: 20px;
list-style: none;
margin: 0;
padding: 10px 12px;
text-align: center;
transition: all 200ms;
vertical-align: baseline;
white-space: nowrap;
user-select: none;
-webkit-user-select: none;
touch-action: manipulation;
" href="${domain}/email-confirmation/${token}?id=${userId}">
  Confirm email
</a>
<p style="font-size: 12px; font-weight: 400;">
  If you don't do any register actions in our app, please ignore this link
</p>
`;
