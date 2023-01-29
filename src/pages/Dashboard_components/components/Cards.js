import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Modal, Snackbar } from '@mui/material';
import Message from './Cards_components/Message';
import { auth } from '../../../firebase_config';

export default function Cards(props) {

  const { displayName, photoURL } = props.data._document.data.value.mapValue.fields
  const [open, setOpen] = React.useState(false)
  const [alert, showAlert] = React.useState(false)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
    minWidth: 400
  };

  return (
    auth.currentUser.email === props.data.data().email ?
      <Card sx={{ maxWidth: 345, minHeight: 320 }}>
        <CardMedia
          sx={{ height: 140, borderRadius: '50' }}
          image={photoURL.stringValue}
          title={displayName.stringValue}
          referrerPolicy="no-referrer"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {displayName.stringValue}(You)
          </Typography>
        </CardContent>
      </Card>
      :
      <Card sx={{ maxWidth: 345, minHeight: 320 }}>
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
          <Button size="small" color='primary' variant='outlined' onClick={() => setOpen(!open)}>Send Message</Button>
        </CardActions>
        <Snackbar
          open={alert}
          autoHideDuration={2000}
          onClose={() => showAlert(!alert)}
          message="Message sent"
        />
        <Modal
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card sx={style}>
            <CardContent>
              <Message data={props.data._document} id={props.data.id} close={setOpen} alert={showAlert} />
            </CardContent>
          </Card>
        </Modal>
      </Card>
  )
}
