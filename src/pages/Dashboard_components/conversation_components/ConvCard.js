import { Backdrop, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore"
import { auth, db } from '../../../firebase_config'
import Skeletons from '../components/Skeletons';
import Modals from './ConvComponents/Modals';


export default function ConvCard() {
  const [convs, setconvs] = useState([])
  const [loading, setLoading] = useState(true)

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
          convs.length ?
            convs.map(data =>
              <Grid item xs={6} md={2} key={data.doc_id}>
                <Modals data={data} setLoading={setLoading} />
              </Grid>
            )
            :
            <Grid item xs={12}>
              <Typography>No conversations to show</Typography>
            </Grid>
        }
      </Grid>
  )
}
