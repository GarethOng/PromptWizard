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
import { FormRow } from '../../components'
const ContextCard = (props) => {
  return (
    <Card sx={{ width: '250px', height: '335px' }}>
      <CardContent>
        <Typography gutterBottom variant='p' component='div'>
          {props.information}
        </Typography>
      </CardContent>
    </Card>
  )
}
const AddData = () => {
  const [responses, setResponses] = useState([])
  const [contexts, setContexts] = useState([])
  const addContext = async (name, information) => {
    // send to backend at /api/v1/context/add
    const response = await fetch('http://localhost:5001/api/v1/context/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        information: information,
      }),
    })
    const processed = await response.json()
    console.log(processed.contexts)
    setContexts(processed.contexts)
  }
  const getResponses = async (prompt_name, prompt_version) => {
    console.log(prompt_name)
    console.log(prompt_version)
    // send to backend at /api/v1/responses
    const response = await fetch('http://localhost:5001/api/v1/context/add', {
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
  const [text, setText] = useState('')

  const handleTextChange = (e) => {
    e.preventDefault()
    setText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    addContext(selectedListing, text)
  }
  const handleSelectListing = (e) => {
    e.preventDefault()
    setSelectedListing(e.target.value)
  }

  const [currentPage, setCurrentPage] = useState(0)
  const [slideDirection, setSlideDirection] = useState('left')
  const cardsPerPage = 5
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
        <h4>Add Document</h4>
        <FormRow
          name='Enter Documents:'
          value={text}
          handleChange={handleTextChange}
        />
        <div className='form-center'>
          {/* search position */}
          <FormRowSelect
            name='Document:'
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
          {contexts.map((context, index) => (
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
                  {contexts
                    .slice(
                      index * cardsPerPage,
                      index * cardsPerPage + cardsPerPage
                    )
                    .map((context, i) => (
                      <ContextCard key={i} information={context.information} />
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
            currentPage >= Math.ceil((contexts.length || 0) / cardsPerPage) - 1
          }
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Wrapper>
  )
}

export default AddData
