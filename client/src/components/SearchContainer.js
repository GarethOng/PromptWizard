import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useState } from 'react'

const SearchContainer = () => {
  const {
    isLoading,
    handleChange,
    sort,
    sortOptions,
    contactOptions,
    filter,
    showRead,
    showReadOption,
  } = useAppContext()
  const [search, setSearch] = useState('')
  const [contact, setContact] = useState('')
  const [prompt, setPrompt] = useState('')
  const [promptVersion, setPromptVersion] = useState('')
  const [documentDatabase, setDocumentDatabase] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleChange({ name: 'keyword', value: search })
    handleChange({ name: 'contactSearch', value: contact })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleSelectListing = (e) => {
    e.preventDefault()
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
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h4>Prompt Context</h4>
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
      </form>
    </Wrapper>
  )
}

export default SearchContainer
