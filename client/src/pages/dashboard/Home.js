import React from 'react'
import house_one from '../../assets/images/1.jpg'
import house_two from '../../assets/images/2.jpg'
import house_three from '../../assets/images/3.jpg'
import house_four from '../../assets/images/4.jpg'
import house_five from '../../assets/images/5.jpg'

import { CardMedia } from '@mui/material'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'

import { SearchContainer } from '../../components'

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
        <Link to='/ListingInfo' className='btn'>
          learn more
        </Link>
      </CardActions>
    </Card>
  )
}

// hard coded data
const listings = [
  {
    name: 'Cozy Cottage',
    location: 'Trenton, NJ',
    costOfRenovation: 25000,
    image: house_one,
  },
  {
    name: 'Farmhouse',
    location: 'Ruralton, OH',
    costOfRenovation: 75000,
    image: house_two,
  },
  {
    name: 'Bungalow',
    location: 'Ocean City, CA',
    costOfRenovation: 10000,
    image: house_three,
  },
  {
    name: 'Victorian Charm',
    location: 'Historic District, MA',
    costOfRenovation: 60000,
    image: house_four,
  },
  {
    name: 'Modern Condo',
    location: 'Downtown Metropolis',
    costOfRenovation: 15000,
    image: house_five,
  },
]

const cardsPerPage = 5

const containerWidth = cardsPerPage * 250

function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  const [slideDirection, setSlideDirection] = useState('left')

  const handleNextPage = () => {
    setSlideDirection('left')
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setSlideDirection('right')
    setCurrentPage((prevPage) => prevPage - 1)
  }
  return (
    <>
      <SearchContainer />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          height: '400px',
          width: '100%',
          marginTop: '40px',
        }}
      >
        <Box sx={{ width: `${containerWidth}px`, height: '100%' }}>
          {/* this is the box that holds the cards and the slide animation,
        in this implementation the card is already constructed but in later versions you will see how the
        items you wish to use will be dynamically created with the map method*/}
          {listings.map((listing, index) => (
            <Box
              key={`card-${index}`}
              sx={{
                width: '100%',
                height: '100%',
                display: currentPage === index ? 'block' : 'none',
              }}
            >
              {/* this is the slide animation that will be used to slide the cards in and out*/}
              <Slide direction={slideDirection} in={currentPage === index}>
                <Stack
                  spacing={2}
                  direction='row'
                  alignContent='center'
                  justifyContent='center'
                  sx={{ width: '100%', height: '100%' }}
                >
                  {listings
                    .slice(
                      index * cardsPerPage,
                      index * cardsPerPage + cardsPerPage
                    )
                    .map((listing, i) => (
                      <Listing key={i} listing={listing} />
                    ))}
                </Stack>
              </Slide>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default Home
