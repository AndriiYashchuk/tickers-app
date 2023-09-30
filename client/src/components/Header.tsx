import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Stack from '@mui/system/Stack';

export const Header = () => (
  <AppBar
    position="static"
    elevation={0}
    sx={{
      backgroundColor: '#2e3d72',
      color: '#a8baec'
    }}
  >
    <Toolbar>
      <Typography>
        Tickers
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          size={"medium"}
          sx={{
            backgroundColor: '#2e3d72',
            color: '#a8baec'
          }}
        >
          Home
        </Button>
        <Button
          size={"medium"}
          sx={{
            backgroundColor: '#2e3d72',
            color: '#a8baec'
          }}
        >
          Profile
        </Button>
        <Button
          size={"medium"}
          sx={{
            backgroundColor: '#2e3d72',
            color: '#a8baec'
          }}
        >
          Reports
        </Button>
      </Stack>
    </Toolbar>
  </AppBar>
)
