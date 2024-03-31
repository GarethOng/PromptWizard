import { CardMedia } from '@mui/material'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'
import { Button } from '@mui/material'

import { FormRow, FormRowSelect } from '../../components'
import Wrapper from '../../assets/wrappers/SearchContainer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import React from 'react'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import ListItemButton from '@mui/material/ListItemButton'

const cardsPerPage = 5

const containerWidth = cardsPerPage * 250

const rowData = (props) => {
  return (
    <ListItem key={props.index} component='div' disablePadding>
      <ListItemButton>
        <ListItemText primary={props.information} />
      </ListItemButton>
    </ListItem>
  )
}

function Home() {
  const getPrompt = async (name, version) => {
    const response = await fetch('http://localhost:5001/api/v1/prompt/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        version: version,
      }),
    })
    const processed = await response.json()
    console.log(processed)
    setEditPrompt(processed.prompt.prompt_description)
    console.log(editPrompt)
  }
  const handleSetEditPrompt = (e) => {
    e.preventDefault()
    setEditPrompt(e.target.value)
  }

  const [editPrompt, setEditPrompt] = useState('')
  function renderPromptContexts(props) {
    const { index, style } = props

    return (
      <ListItem style={style} key={index} component='div' disablePadding>
        <ListItemButton>
          <ListItemText
            secondary={
              index >= promptContexts.length
                ? null
                : promptContexts[index].information
            }
          />
        </ListItemButton>
      </ListItem>
    )
  }
  function renderQuestionContexts(props) {
    const { index, style } = props

    return (
      <ListItem style={style} key={index} component='div' disablePadding>
        <ListItemButton>
          <ListItemText
            secondary={
              index >= questionContexts.length
                ? null
                : questionContexts[index].information
            }
          />
        </ListItemButton>
      </ListItem>
    )
  }
  const [prompt, setPrompt] = useState('')
  const [promptVersion, setPromptVersion] = useState('')
  const [documentDatabase, setDocumentDatabase] = useState('')
  const [question, setQuestion] = useState('')
  const handleQuestion = (e) => {
    e.preventDefault()
    setQuestion(e.target.value)
  }

  const sendQuestionToOpenAI = async (
    question,
    context_name,
    prompt_name,
    prompt_version
  ) => {
    const response = await fetch('http://localhost:5001/api/v1/openai/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: question,
        context_name: context_name,
        prompt_name: prompt_name,
        prompt_version: prompt_version,
      }),
    })
    const processed = await response.json()
    console.log(processed)
    setLlmResponse(processed.results)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    sendQuestionToOpenAI(question, documentDatabase, prompt, promptVersion)
  }

  const handleSelectListing = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setPrompt(e.target.value)
  }

  const handleSelectVersion = (e) => {
    e.preventDefault()
    setPromptVersion(e.target.value)
  }

  const handleSelectDocumentDatabase = (e) => {
    e.preventDefault()
    setDocumentDatabase(e.target.value)
  }

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

  const [promptContexts, setPromptContexts] = useState([])
  const [questionContexts, setQuestionContexts] = useState([])

  const [llmResponse, setLlmResponse] = useState('Ask me something :)')

  const generateQuestion = async (
    context_name,
    prompt_name,
    prompt_version,
    question
  ) => {
    console.log('context_name' + context_name)
    console.log('prompt_name' + prompt_name)
    console.log('prompt_version' + prompt_version)
    console.log('question' + question)
    const response = await fetch(
      'http://localhost:5001/api/v1/openai/generate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          context_name: context_name,
          prompt_name: prompt_name,
          prompt_version: prompt_version,
          question: question,
        }),
      }
    )
    const processed = await response.json()
    setPromptContexts(processed.promptContexts)
    setQuestionContexts(processed.questionContexts)
  }

  const handleVectorSearch = (e) => {
    e.preventDefault()
    console.log('Vector Search')
    generateQuestion(documentDatabase, prompt, promptVersion, question)
    // send to backend at /api/v1/responses
  }

  useEffect(() => {
    getPrompt(prompt, promptVersion)
  }, [prompt, promptVersion])
  return (
    <>
      <Wrapper>
        <form className='form' onSubmit={handleSubmit}>
          <h4>Wizard Settings</h4>
          <div className='form-center'>
            {/* search position */}

            <FormRowSelect
              name='Document Database'
              list={[
                'Retirement',
                'Young Adults',
                'Kids',
                'Investments',
                'Business',
                'capitalone',
              ]}
              value={documentDatabase}
              handleChange={handleSelectDocumentDatabase}
            />
            <FormRowSelect
              name='Prompt'
              value={prompt}
              list={[
                'Retirement',
                'Young Adults',
                'Kids',
                'Investments',
                'Business',
                'capitalone',
              ]}
              handleChange={handleSelectListing}
            />

            <FormRowSelect
              name='Prompt Version'
              value={promptVersion}
              list={['1.0', '1.1', '2.0', '2.1']}
              handleChange={handleSelectVersion}
            />
          </div>
          <FormRow
            name='Enter Question:'
            value={question}
            handleChange={handleQuestion}
          />
          <div className='form-center'>
            <FormRow
              name='Edit Prompt:'
              value={editPrompt}
              handleChange={handleSetEditPrompt}
            />

            <Button className='btn btn-block' onClick={handleVectorSearch}>
              Vector Search
            </Button>
            <button className='btn btn-block' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Wrapper>
      <Stack
        spacing={2}
        direction='row'
        alignContent='center'
        justifyContent='center'
        sx={{ width: '100%', height: '100%' }}
      >
        <Card sx={{ width: '700px', height: '335px' }}>
          <CardContent>
            <Typography gutterBottom variant='h6' component='div'>
              Prompt Context
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: 400,
                maxWidth: 590,
                bgcolor: 'background.paper',
              }}
            >
              <FixedSizeList
                height={400}
                width={590}
                itemSize={46}
                itemCount={200}
                overscanCount={5}
              >
                {renderPromptContexts}
              </FixedSizeList>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ width: '700px', height: '335px' }}>
          <CardContent>
            <Typography gutterBottom variant='h6' component='div'>
              Question Context
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: 400,
                maxWidth: 590,
                bgcolor: 'background.paper',
              }}
            >
              <FixedSizeList
                height={400}
                width={590}
                itemSize={46}
                itemCount={200}
                overscanCount={5}
              >
                {renderQuestionContexts}
              </FixedSizeList>
            </Box>
          </CardContent>
        </Card>
      </Stack>
      <Wrapper>
        <form className='form'>
          <h4>LLM's Response</h4>
          <Card sx={{ width: '1250px', height: '335px' }}>
            <CardContent>
              <Typography gutterBottom variant='p' component='div'>
                {llmResponse}
              </Typography>
            </CardContent>
          </Card>
        </form>
      </Wrapper>
    </>
  )
}

export default Home
