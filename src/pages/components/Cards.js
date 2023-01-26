import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import GoogleButton from 'react-google-button';
import GithubButton from 'react-github-login-button';
import { CardActions } from '@mui/material';
import { auth, db, provider } from '../../firebase_config';
import { collection, doc, setDoc } from 'firebase/firestore';
import { signInWithPopup } from 'firebase/auth';


export default function MediaCard() {
  const SignIn = async () => {
    const userRef = collection(db, "users")
    await signInWithPopup(auth, provider)
    try {
      await setDoc(doc(userRef, auth.currentUser.uid), {
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL
      })
    } catch (e) {
      console.log(e)
    }
  }
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
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <GoogleButton onClick={SignIn}/>
      </CardActions>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <GithubButton type='dark' />
      </CardActions>
    </Card>
  );
}
