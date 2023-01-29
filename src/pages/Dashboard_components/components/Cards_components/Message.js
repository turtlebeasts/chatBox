import { Avatar, Button, Chip, CircularProgress, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { db, auth } from "../../../../firebase_config"
import { arrayUnion, doc, getDoc, serverTimestamp, setDoc  } from 'firebase/firestore'

export default function Message(props) {
  const { data, id } = props
  const [text, setText] = useState("Hi")
  const [loading, setLoading] = useState(false)
  
  const sendHello = async() => {
    setText("")
    setLoading(true)
    const isPresent = await getDoc(doc(db,"messages",id+auth.currentUser.uid))
    const userText = text
    if(isPresent._document===null){
      await setDoc(doc(db, "messages", auth.currentUser.uid+id),{
        createdAt: serverTimestamp(),
        uid1: auth.currentUser.uid,
        uid2: id,
        photo1: auth.currentUser.photoURL,
        photo2: data.data.value.mapValue.fields.photoURL.stringValue,
        name1: auth.currentUser.displayName,
        name2: data.data.value.mapValue.fields.displayName.stringValue,
        message: arrayUnion({
          from: auth.currentUser.uid,
          text: userText
        }),
      },{merge: true})
    }else{
      await setDoc(doc(db, "messages", id+auth.currentUser.uid),{
        createdAt: serverTimestamp(),
        message: arrayUnion({
          from: auth.currentUser.uid,
          text: userText
        })
      },{merge: true})
    }
    props.alert(true)
    props.close(false)
  }

  return (
    <>
      <Typography variant='body1'>
        Be nice to people, consider just sending a <b><i>Hi</i></b>
      </Typography><br/>
      <Chip
        avatar={<Avatar alt="Natacha" src={data.data.value.mapValue.fields.photoURL.stringValue} />}
        label={data.data.value.mapValue.fields.displayName.stringValue}
        variant="outlined"
        sx={{ mt: 2, mb: 2 }}
      /><br/>
      <TextField label="Your message" variant='outlined' value={text} onChange={(e)=>setText(e.target.value)}/><br/>
      Suggested: <br/>
      <Chip 
      label="Hello!"
      variant='outlined'
      onClick={()=>{setText("Hello!")}}
      sx={{mr: 1, mb: 1}}
      />
      <Chip 
      label="May I get to know you?"
      variant='outlined'
      onClick={()=>{setText("May I get to know you?")}}
      sx={{mr: 1, mb: 1}}
      />
      <br/>
      <Chip 
      label={"Greetings "+ data.data.value.mapValue.fields.displayName.stringValue}
      variant='outlined'
      onClick={()=>{setText("Greetings "+data.data.value.mapValue.fields.displayName.stringValue)}}
      sx={{mr: 1, mb: 1}}
      />
      <br/>
      {
        !loading
        ?<Button variant="contained" disabled={text.length===0} sx={{mt: 2}} onClick={sendHello}>Send</Button>
        :<CircularProgress color="inherit" size={24}/>
      }
    </>
  )
}
