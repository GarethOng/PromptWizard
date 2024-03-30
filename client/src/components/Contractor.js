import React from 'react'
import { Button, CardMedia } from '@mui/material'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const Contractor = (props) => {
  return (
    <Card sx={{ width: '250px', height: '335px' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.contractor.image}
        title={props.contractor.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.contractor.name}
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

export default Contractor
/*
  return (
    <Paper>
      <div className='info'>
        <Link to='/register' className='btn btn-hero'>
          Check it out!
        </Link>
        <h2>{props.contractor.name}</h2>
        <p>{props.contractor.location}</p>
        <p>Cost of Renovation: {props.contractor.costOfRenovation}</p>
      </div>
      <img
        src={props.contractor.image}
        alt={props.contractor.name}
        width='200'
        height='150'
      />
    </Paper>
  )
  */
