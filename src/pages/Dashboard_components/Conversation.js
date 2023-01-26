import { Grid } from '@mui/material'
import React from 'react'
import ConvCard from './conversation_components/ConvCard'

export default function Conversation() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={2}>
        <ConvCard />
      </Grid>
    </Grid>
  )
}
