import React from 'react';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";
export const Footer = () => {
    return (<Box component="footer" sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
        }}>
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="/">
              Andrii Yashchuk.
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Container>
      </Box>);
};
