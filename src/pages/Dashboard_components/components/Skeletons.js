import { Card, CardActions, CardContent, Grid, Skeleton } from '@mui/material'
import React from 'react'

export default function Skeletons() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6} md={2}>
                <Card sx={{ maxWidth: 345 }}>
                    <Skeleton variant='rectangular' sx={{ height: 140, borderRadius: '50' }}/>
                    <CardContent>
                        <Skeleton variant="text"/>
                    </CardContent>
                    <CardActions>
                        <Skeleton variant="rectangular"/>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={6} md={2}>
                <Card sx={{ maxWidth: 345 }}>
                    <Skeleton variant='rectangular' sx={{ height: 140, borderRadius: '50' }}/>
                    <CardContent>
                        <Skeleton variant="text"/>
                    </CardContent>
                    <CardActions>
                        <Skeleton variant="rectangular"/>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={6} md={2}>
                <Card sx={{ maxWidth: 345 }}>
                    <Skeleton variant='rectangular' sx={{ height: 140, borderRadius: '50' }}/>
                    <CardContent>
                        <Skeleton variant="text"/>
                    </CardContent>
                    <CardActions>
                        <Skeleton variant="rectangular"/>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={6} md={2}>
                <Card sx={{ maxWidth: 345 }}>
                    <Skeleton variant='rectangular' sx={{ height: 140, borderRadius: '50' }}/>
                    <CardContent>
                        <Skeleton variant="text"/>
                    </CardContent>
                    <CardActions>
                        <Skeleton variant="rectangular"/>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}
