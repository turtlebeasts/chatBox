import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Cards(props) {
  const {displayName, photoURL} = props.data._document.data.value.mapValue.fields

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140, borderRadius: '50' }}
        image={photoURL.stringValue}
        title={displayName.stringValue}
        referrerPolicy="no-referrer"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {displayName.stringValue}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color='primary' variant='outlined'>Send Message</Button>
      </CardActions>
    </Card>
  );
}
