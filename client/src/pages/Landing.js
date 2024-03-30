import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import main from '../assets/images/landingphoto.svg'
import { Link } from 'react-router-dom'
import { ListingContainer } from '../components'
import { ContractorContainer } from '../components'

function Landing() {
  return (
    <Wrapper>
      <Logo />
      <div className='container page'>
        <div className='info'>
          <h1>
            Rebuilding <span>our</span> community!
          </h1>
          <p>Add slogan to project</p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='collate' className='img main-img' />
      </div>
      <ListingContainer />
      <ContractorContainer />
    </Wrapper>
  )
}

export default Landing
