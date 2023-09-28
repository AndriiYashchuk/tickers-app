import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Stack from '@mui/system/Stack';
import { styled, useTheme } from '@mui/system';

const Item = styled('div')(({ theme }) => ({
  textAlign: 'center',
  borderRadius: 4,
}))

const MarginLeft = styled('div')(({ theme }) => ({
  marginLeft: '20px'
}))

export const Header = (): JSX.Element => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main
    }}
    >
      <Toolbar>
        <Typography>
          Tickers
        </Typography>
        <MarginLeft>
          <Stack direction="row" spacing={2}>
            <Item>
              <Button size={"medium"}>
                Home
              </Button>
            </Item>
            <Item>
              <Button size={"medium"}>
                Profile
              </Button>
            </Item>
            <Item>
              <Button size={"medium"}>
                Reports
              </Button>
            </Item>
          </Stack>
        </MarginLeft>
      </Toolbar>
    </AppBar>
  );
}
