import React from 'react';

interface Props {
  user: string
}

export const App = ({ user }: Props) => (
  <h2>Hi man its new build, {user}</h2>
)
