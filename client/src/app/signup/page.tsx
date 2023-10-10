'use client'
import React, { useState } from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import HowToReg from "@mui/icons-material/HowToReg";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NextLink from 'next/link';
import axios from 'axios';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const onSubmit = async (e: any) => {
    e.preventDefault();

    const response = await axios.post('/api/users/signup', { email, password, name, surname });
    console.log(response.data)
  }

  const onChanged = (onChange: (value: string) => void) =>
    (e: any) => onChange(e.target.value);
  const handleEmail = onChanged(setEmail);
  const handlePassword = onChanged(setPassword);
  const handleName = onChanged(setName);
  const handleSurname = onChanged(setSurname)

  return (
    <Container
      style={{ marginTop: "50px" }}
      component="div"
      maxWidth="xs"
    >
      <CssBaseline />
      <div>
        <Grid
          container
          justifyContent={"center"}
          padding="10px 0"
        >
          <Avatar>
            <HowToReg color="inherit" />
          </Avatar>
          <Typography
            component="h3"
            variant="h5"
            justifyContent="center"
            style={{
              marginLeft: "10px",
              display: "flex",
              alignItems: "center"
            }}
          >
            Sign up
          </Typography>
        </Grid>
        <form noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleSurname}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleEmail}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handlePassword}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Grid marginTop="16px">
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
            >
              Sign Up
            </Button>
          </Grid>
          <Grid
            marginTop="16px"
            container
            justifyContent={"center"}
          >
            <Grid item>
              <NextLink href="/login">
                <Link component="span" variant="body2">
                  Already have an account? Sign in
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>);
}

export default Signup;
