import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ConvCard() {
  return (
    <Card>
      <CardMedia 
      sx={{height: 150}}
      image='images/Banner.png'
      alt="Banner"
      />
      <CardContent>
        <Typography variant='body1'>Siddharth</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">Open</Button>
      </CardActions>
      <CardActions>
        <IconButton>
            <StarIcon />
        </IconButton>
        <IconButton>
            <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
