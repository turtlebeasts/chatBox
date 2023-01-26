import { Button, Grid } from '@mui/material'
import React from 'react'
import Cards from './components/Cards'
import Skeletons from './components/Skeletons'

export default function UsersPage(props) {

  const { userList } = props

  return (
    <Grid container spacing={2}>
      {
        userList.length ?
          userList.map((items, key) => {
            return (
              <Grid item xs={6} md={2} key={key}>
                <Cards data={items}/>
              </Grid>
            )
          })
          :
          <Skeletons />
      }
    </Grid>
  )
}
