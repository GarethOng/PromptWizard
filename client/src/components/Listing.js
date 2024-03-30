import React from 'react'
import { Paper, Button, CardMedia } from '@mui/material'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const Listing = (props) => {
  return (
    <Card sx={{ width: '250px', height: '335px' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.listing.image}
        title={props.listing.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.listing.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {props.listing.location}
        </Typography>
      </CardContent>
      <CardActions margin={'auto'}>
        <Link to='/register' className='btn'>
          learn more
        </Link>
      </CardActions>
    </Card>
  )
}

export default Listing
/*
  return (
    <Paper>
      <div className='info'>
        <Link to='/register' className='btn btn-hero'>
          Check it out!
        </Link>
        <h2>{props.listing.name}</h2>
        <p>{props.listing.location}</p>
        <p>Cost of Renovation: {props.listing.costOfRenovation}</p>
      </div>
      <img
        src={props.listing.image}
        alt={props.listing.name}
        width='200'
        height='150'
      />
    </Paper>
  )
  */
