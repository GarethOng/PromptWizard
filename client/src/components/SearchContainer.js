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

  const handleSubmit = (e) => {
    e.preventDefault()
    handleChange({ name: 'keyword', value: search })
    handleChange({ name: 'contactSearch', value: contact })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    handleChange({ name: e.target.name, value: e.target.value })
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h4>search listings</h4>
        <div className='form-center'>
          {/* search position */}

          <FormRow
            type='text'
            name='keyword'
            value={search}
            handleChange={(e) => {
              setSearch(e.target.value)
            }}
          />
          <FormRowSelect
            name='sort'
            value={sort}
            list={sortOptions}
            handleChange={handleSearch}
          />

          <FormRowSelect
            name='filter'
            value={filter}
            list={contactOptions}
            handleChange={handleSearch}
          />
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
