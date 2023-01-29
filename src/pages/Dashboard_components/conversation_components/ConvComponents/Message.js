import { Card, CardContent, Typography, TextField, IconButton, Backdrop, CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { auth, db } from '../../../../firebase_config'
import SendIcon from '@mui/icons-material/Send';
import { arrayUnion, doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';

export default function Message(props) {
    const [data, setData] = useState({ message: [] })
    const [loading, setLoading] = useState(false)
    const [convLoading, setConvLoad] = useState(true)

    const style_recieved = {
        bgcolor: '#dedede',
        maxWidth: 200,
        justifyContent: 'flex-start',
        borderRadius: 50
    }
    const style_sent = {
        bgcolor: '#528ade',
        color: 'white',
        maxWidth: 200,
        justifyContent: 'flex-end',
        borderRadius: 50
    }

    const container = {
        height: 500,
        overflow: 'scroll',
        scrollBehavior: 'smooth'
    }

    const [text, setText] = useState("")
    const handleSend = async () => {
        setLoading(true)
        await setDoc(doc(db, "messages", props.doc_id), {
            createdAt: serverTimestamp(),
            message: arrayUnion({
                from: auth.currentUser.uid,
                text: text
            })
        }, { merge: true })
        setText("")
        setLoading(false)
    }
    
    onSnapshot(doc(db, "messages", props.doc_id), doc => {
        doc.data()!==undefined
        ?setData(doc.data())
        :setData({message: []})
        setConvLoad(false)
    })
    return (
        <>
            <Box sx={container}>
                {
                    convLoading
                        ?
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={true}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        :
                        data.message.length ?
                            data.message.map((data, key) => {
                                return (
                                    <Box sx={{ display: 'flex', mb: 1, justifyContent: data.from === auth.currentUser.uid ? "flex-end" : "flex-start" }} key={key}>
                                        <Card sx={data.from === auth.currentUser.uid ? style_sent : style_recieved}>
                                            <CardContent>
                                                <Typography>
                                                    {data.text}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                )
                            })
                            :
                            <Box sx={{ display: 'flex', mb: 1, justifyContent: "center"}}>
                                <Typography color={'GrayText'}>
                                    This conversation has been deleted
                                </Typography>
                            </Box>
                }
            </Box>
            <Box style={{ display: "flex", justifyContent: "center" }}>
                <TextField variant="standard" placeholder='Message...' style={{ width: 250 }} value={text} onChange={(e) => setText(e.target.value)} autoComplete="off" />
                <IconButton onClick={handleSend} disabled={text.length === 0}>
                    {
                        loading
                            ? <CircularProgress color="inherit" size={24} />
                            : <SendIcon />
                    }
                </IconButton>
            </Box>
        </>
    )
}
