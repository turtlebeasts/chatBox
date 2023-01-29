import { Avatar, AvatarGroup, Backdrop, Button, Card, CardActions, CardContent, CircularProgress, Grid, Menu, MenuItem, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { auth, db } from '../../../firebase_config'
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Message from './ConvComponents/Message';
import Skeletons from '../components/Skeletons';


export default function ConvCard() {
  const [convs, setconvs] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openModal, setModal] = useState(false)
  const handleOpen = (e) => {
    setOpen(!open)
    setAnchorEl(e.currentTarget)
  }


  useEffect(() => {
    const collectionRef = collection(db, "messages")
    const getConvs = async () => {
      const query1 = query(collectionRef, where("uid1", "==", auth.currentUser.uid))
      const query2 = query(collectionRef, where("uid2", "==", auth.currentUser.uid))
      const docs1 = await getDocs(query1)
      const docs2 = await getDocs(query2)
      const arr = []

      docs1.forEach((doc) => {
        arr.push({
          doc_id: doc.id,
          data: doc.data()
        })
      });
      docs2.forEach((doc) => {
        arr.push({
          doc_id: doc.id,
          data: doc.data()
        })
      });
      setconvs(arr)
      setLoading(false)
    }

    getConvs()
  }, [loading])

  const Delete = async (doc_id, e) =>
  {
    handleOpen(e)
    setLoading(true)
    await deleteDoc(doc(db, "messages", doc_id))
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    minWidth: 400,
    pl: 4,
    pr: 5
  };
  return (
    loading ?
      <>
        <Skeletons />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
      :
      <Grid container spacing={2}>
        {
          convs.length?
          convs.map(data => {
            return (
              <Card component={Grid} item xs={6} md={2} key={data.doc_id}>
                <CardActions sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                  <MoreVertIcon onClick={handleOpen} />
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setOpen(!open)}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={(e)=>Delete(data.doc_id, e)}>Delete</MenuItem>
                  </Menu>
                </CardActions>
                <AvatarGroup sx={{ justifyContent: 'center' }}>
                  <Avatar src={data.data.photo1} alt={data.data.displayName1} />
                  <Avatar src={data.data.photo2} alt={data.data.displayName2} />
                </AvatarGroup>
                <CardContent>
                  <Typography variant='body1'>{
                    data.data.uid1 === auth.currentUser.uid
                      ? data.data.name2
                      : data.data.name1
                  }</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" color="primary" size='small' onClick={() => setModal(!openModal)}>Open</Button>
                  <Modal
                    open={openModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Card sx={style}>
                      <CardContent sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <CloseIcon onClick={() => setModal(!openModal)} />
                      </CardContent>
                      <Message doc_id={data.doc_id} data={data.data} />
                    </Card>
                  </Modal>
                </CardActions>
              </Card>
            )
          })
          :
          <Grid item xs={12}>
            <Typography>No conversations to show</Typography>
          </Grid>
        }
      </Grid>
  )
}
