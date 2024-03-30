import Wrapper from '../assets/wrappers/Job'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'

const Contact = ({ _id, name, gmail, relationship, telegram }) => {
  const { setEditContact } = useAppContext()
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{name.charAt(0)}</div>
        <div className='info'>
          <h4>Name: {name}</h4>
          <h4>email: {gmail}</h4>
          <h4>relationship: {relationship}</h4>
          <h4>{telegram && 'telegram: ' + telegram}</h4>
        </div>
      </header>
      <footer>
        <div className='actions'>
          <Link
            to='/edit'
            className='btn edit-btn'
            onClick={() => setEditContact(_id)}
          >
            edit
          </Link>
        </div>
      </footer>
    </Wrapper>
  )
}

export default Contact
