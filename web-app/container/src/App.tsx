import React from 'react';
import DashboardApp from './components/DashboardApp';

interface Props {
  user: string
}

export const App = ({ user }: Props) => (
  <>
    <h2>Its home page your name is, {user}</h2>
    <DashboardApp />
  </>
)
