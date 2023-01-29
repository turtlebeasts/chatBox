import { Avatar, AvatarGroup, Button, Card, CardActions, CardContent, Grid, Menu, MenuItem, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Message from './Message';
import { deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../../../firebase_config';

export default function Modals(props) {
    const { data } = props
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [openModal, setModal] = useState(false)
    const {setLoading} = props

    const handleOpen = (e) => {
        setOpen(!open)
        setAnchorEl(e.currentTarget)
    }

    const Delete = async (doc_id, e) => {
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
        pl: 2,
        pr: 2
    };
    return (
        <Card component={Grid}>
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
                    <MenuItem onClick={(e) => Delete(data.doc_id, e)}>Delete</MenuItem>
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
            </CardActions>
            <Modal
                open={openModal}
                onClose={() => setModal(false)}
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
        </Card>
    )
}
