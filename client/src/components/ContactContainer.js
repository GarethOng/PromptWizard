import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Wrapper from '../assets/wrappers/JobsContainer'
import Contact from './Contact'

function ContactContainer() {
  const {
    getContacts,
    contacts,
    contactType,
    totalContacts,
    isLoading,
    contactKeyword,
  } = useAppContext()
  useEffect(() => {
    getContacts()
  }, [contactKeyword, contactType])
  if (isLoading) {
    return <Loading center />
  }
  if (totalContacts === 0) {
    return (
      <Wrapper>
        <h2>No contacts! Time to make some friends!</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
        {totalContacts} Contact{totalContacts > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {contacts.map((contact) => {
          return (
            <Contact
              _id={contact._id}
              key={contacts.indexOf(contact)}
              name={contact.name}
              gmail={contact.gmail}
              relationship={contact.relationship}
              telegram={contact.telegram}
            />
          )
        })}
      </div>
    </Wrapper>
  )
}

export default ContactContainer
