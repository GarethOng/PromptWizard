import React from 'react'
import Contractor from './Contractor'

import { useState } from 'react'
import Box from '@mui/material/Box'
import { IconButton } from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import carpenter from '../assets/images/carpenter.jpg'
import construction from '../assets/images/construction.jpg'
import electrician from '../assets/images/electrician.jpg'
import plumber from '../assets/images/plumber.jpg'

// hard coded data
const contractors = [
  {
    name: 'Construction Company',
    location: 'Suburbanville, NY',
    costOfRenovation: 25000,
    image: construction,
  },
  {
    name: 'Carpenter Company',
    location: 'Ruralton, OH',
    costOfRenovation: 75000,
    image: carpenter,
  },
  {
    name: 'Plumping Company',
    location: 'Ocean City, CA',
    costOfRenovation: 10000,
    image: plumber,
  },
  {
    name: 'Electricity Company',
    location: 'Historic District, MA',
    costOfRenovation: 60000,
    image: electrician,
  },
]

const cardsPerPage = 4

const containerWidth = cardsPerPage * 250

function ContractorContainer() {
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
      <Typography variant='h5'>Featured contractors: </Typography>
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
        {contractors.map((listing, index) => (
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
                {contractors

                  .slice(
                    index * cardsPerPage,
                    index * cardsPerPage + cardsPerPage
                  )
                  .map((contractor, i) => (
                    <Contractor key={i} contractor={contractor} />
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
          currentPage >= Math.ceil((contractors.length || 0) / cardsPerPage) - 1
        }
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  )
}

export default ContractorContainer

/*
  return (
    <>
      <Carousel itemsToDisplay={3}>
        {contractors
         .map((listing, i) => (
          <Listing key={i} listing={listing} />
        ))}
      </Carousel>
    </>
  )
*/
