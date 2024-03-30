import React from 'react'
import house_one from '../../assets/images/1.jpg'
import Wrapper from '../../assets/wrappers/LandingPage'
import ProgressBar from '@ramonak/react-progress-bar'
import { useState } from 'react'
import Box from '@mui/material/Box'
import { IconButton, Button } from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'
import { CardMedia } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import carpenter from '../../assets/images/carpenter.jpg'
import construction from '../../assets/images/construction.jpg'
import electrician from '../../assets/images/electrician.jpg'
import plumber from '../../assets/images/plumber.jpg'
import handleButtonClick from '../../utils/contributeLogic'
import { FormRow } from '../../components'

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
        <Typography gutterBottom variant='p' component='div'>
          wallet address: {props.contractor.address}
        </Typography>
      </CardContent>
      <CardActions margin={'auto'}>
        <Link cent className='btn edit-btn'>
          Learn more
        </Link>
      </CardActions>
    </Card>
  )
}

// hard coded data
const contractors = [
  {
    name: 'Trenton Construct',
    location: 'Suburbanville, NY',
    costOfRenovation: 25000,
    image: construction,
    address: '0x2e0b009398fB7206d5330b41da79a8Dac2fC7c03',
  },
  {
    name: 'Trenton Carpenter',
    location: 'Ruralton, OH',
    costOfRenovation: 75000,
    image: carpenter,
    address: '0x9XyZ8WvUuT7SsRrQqPpO',
  },
  {
    name: 'Trenton Plumping',
    location: 'Ocean City, CA',
    costOfRenovation: 10000,
    image: plumber,
    address: '0x2aBcD3eF4GhI5jKlMnOpQ',
  },
  {
    name: 'Trenton Electricty',
    location: 'Historic District, MA',
    costOfRenovation: 60000,
    image: electrician,
    address: '0x3aBcD3eF4GhI5jKlMnOpQ',
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
      <Typography variant='h5'>Approved contractors: </Typography>
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

function ListingInfo() {
  const [amount, setAmount] = useState(0)
  const handleSubmit = (e) => {
    e.preventDefault()
    handleButtonClick(amount)
  }
  const amountRaised = 15000
  const costOfRenovation = 25000
  const donationTrackerStr = '$' + amountRaised + ' out of $' + costOfRenovation
  return (
    <Wrapper>
      <div className='container page'>
        <img src={house_one} height='550' width='550' />
        <div className='info'>
          <h2>Cozy Cottage</h2>
          <p>Trenton, NJ</p>
          <ProgressBar
            completed={`${(amountRaised / costOfRenovation) * 100}`}
            customLabel={donationTrackerStr}
          />
          <br />
          <FormRow
            type='text'
            name='amount:'
            value={amount}
            handleChange={(e) => {
              setAmount(e.target.value)
            }}
          />
          <Button
            variant='contained'
            onClick={handleSubmit}
            sx={{ fontFamily: 'Cabin', fontSize: '16px' }}
          >
            Invest
          </Button>
          <p>
            This is an abandoned cozy cottage in Trenton, NJ. It is in need of
            some renovation. The cost of renovation is $25,000. The renovation
            will include new flooring, new paint, and new appliances. The
            expected resale value of the property is $100,000. Providing a
            potential return on investment of 300%.
          </p>
        </div>
      </div>
      <ContractorContainer />
    </Wrapper>
  )
}

export default ListingInfo
