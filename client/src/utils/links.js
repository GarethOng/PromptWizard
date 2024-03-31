import { FaHome } from 'react-icons/fa'
import { GrNewWindow } from 'react-icons/gr'
import { BsClockHistory } from 'react-icons/bs'

const links = [
  { id: 1, text: 'home', path: '/', icon: <FaHome /> },
  { id: 2, text: 'Add Document', path: '/AddData', icon: <GrNewWindow /> },
  {
    id: 3,
    text: 'History',
    path: '/AddNewListing',
    icon: <BsClockHistory />,
  },
]

export default links
