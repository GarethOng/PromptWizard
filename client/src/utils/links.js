import { FaHome } from 'react-icons/fa'
import { GrNewWindow } from 'react-icons/gr'

const links = [
  { id: 1, text: 'listings', path: '/', icon: <FaHome /> },
  {
    id: 2,
    text: 'add contractor',
    path: '/AddNewListing',
    icon: <GrNewWindow />,
  },
]

export default links
