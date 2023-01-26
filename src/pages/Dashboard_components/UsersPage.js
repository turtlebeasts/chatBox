import { Button, Grid } from '@mui/material'
import React from 'react'
import Cards from './components/Cards'

export default function UsersPage() {
    const myStyle = {
        width: 200,
        height: 100
    }
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={2}>
        <Cards />
      </Grid>
      <Grid item xs={6} md={2}>
        <Cards />
      </Grid>
      <Grid item xs={6} md={2}>
        <Cards />
      </Grid>
      <Grid item xs={6} md={2}>
        <Cards />
      </Grid>
    </Grid>
  )
}
