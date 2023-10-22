export const getBody = ({ domain, name, token }: { domain: string, name: string, token: string }): string => `
<h1>Ticker app email confirmation</h1>
<h3>Hello${name}, could you please confirm you email to have all access of application?<h3>
<p>If you don't do any register actions in our app, please ignore this link</p>
<a style="
  background-color: rgba(51, 51, 51, 0.05);
  border-radius: 8px;
  border-width: 0;
  color: #333333;
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
" href="${domain}/email-confirm/${token}">Confirm registration</a>`
