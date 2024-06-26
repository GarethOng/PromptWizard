import React, { useState } from 'react'

import Wrapper from '../../assets/wrappers/SearchContainer'
import { FormRowSelect } from '../../components'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { IconButton, Button } from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'

const ResponseCard = (props) => {
  return (
    <Card sx={{ width: '250px', height: '335px' }}>
      <CardContent>
        <Typography gutterBottom variant='p' component='div'>
          Question: {props.question}
        </Typography>
        <Typography gutterBottom variant='p' component='div'>
          Response: {props.response}
        </Typography>
      </CardContent>
    </Card>
  )
}
const AddNewListing = () => {
  const [responses, setResponses] = useState([])
  const getResponses = async (prompt_name, prompt_version) => {
    console.log(prompt_name)
    console.log(prompt_version)
    // send to backend at /api/v1/responses
    const response = await fetch('http://localhost:5001/api/v1/response/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt_name: prompt_name,
        prompt_version: prompt_version,
      }),
    })
    const processed = await response.json()
    console.log(processed.responses)
    setResponses(processed.responses)
  }
  const [selectedListing, setSelectedListing] = useState('')
  const [selectedVersion, setSelectedVersion] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    getResponses(selectedListing, selectedVersion)
  }
  const handleSelectListing = (e) => {
    e.preventDefault()
    setSelectedListing(e.target.value)
  }

  const handleSelectVersion = (e) => {
    e.preventDefault()
    setSelectedVersion(e.target.value)
  }

  const [currentPage, setCurrentPage] = useState(0)
  const [slideDirection, setSlideDirection] = useState('left')
  const cardsPerPage = 4
  const containerWidth = cardsPerPage * 250

  const handleNextPage = () => {
    setSlideDirection('left')
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setSlideDirection('right')
    setCurrentPage((prevPage) => prevPage - 1)
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h4>Responses</h4>
        <div className='form-center'>
          {/* search position */}
          <FormRowSelect
            name='Prompt'
            list={[
              'Retirement',
              'Young Adults',
              'Kids',
              'Investments',
              'Business',
              'capitalone',
            ]}
            value={selectedListing}
            handleChange={handleSelectListing}
          />
          <FormRowSelect
            name='prompt version:'
            list={['1.0', '1.1', '2.0', '2.1']}
            value={selectedVersion}
            handleChange={handleSelectVersion}
          />
          <button className='btn btn-block' type='submit'>
            submit
          </button>
        </div>
      </form>
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
          {responses.map((response, index) => (
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
                  {responses
                    .slice(
                      index * cardsPerPage,
                      index * cardsPerPage + cardsPerPage
                    )
                    .map((response, i) => (
                      <ResponseCard
                        key={i}
                        question={response.question}
                        response={response.response}
                      />
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
            currentPage >= Math.ceil((responses.length || 0) / cardsPerPage) - 1
          }
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Wrapper>
  )
}

export default AddNewListing
