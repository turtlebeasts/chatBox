import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import GoogleButton from 'react-google-button';
import GithubButton from 'react-github-login-button';
import { CardActions } from '@mui/material';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140, backgroundSize: 'cover', backgroundPosition: 'right' }}
        image="images/Banner.png"
        title="Banner"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          A new way of connecting with people online
        </Typography>
      </CardContent>
      <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
        <GoogleButton />
      </CardActions>
      <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
        <GithubButton type='dark'/>
      </CardActions>
    </Card>
  );
}
