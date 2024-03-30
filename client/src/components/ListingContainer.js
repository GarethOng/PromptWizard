import React from 'react'
import Listing from './Listing'
import house_one from '../assets/images/1.jpg'
import house_two from '../assets/images/2.jpg'
import house_three from '../assets/images/3.jpg'
import house_four from '../assets/images/4.jpg'
import house_five from '../assets/images/5.jpg'

import { useState } from 'react'
import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// hard coded data
const listings = [
  {
    name: 'Cozy Cottage',
    location: 'Trenton, NJ',
    costOfRenovation: 50000,
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

const cardsPerPage = 4

const containerWidth = cardsPerPage * 250

function ListingContainer() {
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
      <Typography variant='h5'>Featured Listings: </Typography>
      <IconButton
        onClick={handlePrevPage}
        sx={{ margin: 5 }}
        disabled={currentPage === 0}
      >
        {/* this is the button that will go to the previous page you can change these icons to whatever you wish*/}
        <NavigateBeforeIcon />
      </IconButton>
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
      <IconButton
        onClick={handleNextPage}
        sx={{
          margin: 5,
        }}
        disabled={
          currentPage >= Math.ceil((listings.length || 0) / cardsPerPage) - 1
        }
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  )
}

export default ListingContainer

/*
  return (
    <>
      <Carousel itemsToDisplay={3}>
        {listings.map((listing, i) => (
          <Listing key={i} listing={listing} />
        ))}
      </Carousel>
    </>
  )
*/
