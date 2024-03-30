import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useState } from 'react'

function ContactSearchContainer() {
  const { isLoading, handleChange, contactType, contactOptions } =
    useAppContext()
  const [search, setSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleChange({ name: 'contactKeyword', value: search })
  }
  const handleSearch = (e) => {
    e.preventDefault()
    handleChange({ name: e.target.name, value: e.target.value })
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h4>search form</h4>
        <div className='form-center'>
          <FormRow
            type='text'
            name='contact Name'
            value={search}
            handleChange={(e) => {
              setSearch(e.target.value)
            }}
          />
          <FormRowSelect
            name='contact Type'
            value={contactType}
            list={contactOptions}
            handleChange={handleSearch}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'submit'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default ContactSearchContainer
