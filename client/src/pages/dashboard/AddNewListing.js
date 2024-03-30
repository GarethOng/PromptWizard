import React, { useState } from 'react'

import { ethers } from 'ethers'
import Wrapper from '../../assets/wrappers/SearchContainer'
import { FormRow, FormRowSelect } from '../../components'
import { useAppContext } from '../../context/appContext'
import { Alert } from '../../components'

const contractAddress = '0xdE4F8cA5894F7661C608C5Ff0a661925aE52676C'
const contractABI = [
  {
    inputs: [{ internalType: 'address', name: 'contractor', type: 'address' }],
    name: 'addContractor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const AddNewListing = () => {
  const addContractor = async (contractorAddress) => {
    displayAddContractorSuccess()
    console.log('Adding contractor:' + contractorAddress)
    if (typeof window.ethereum === 'undefined') {
      console.error('MetaMask not installed')
      return
    }
    const provider = new ethers.BrowserProvider(window.ethereum)
    console.log('add provider')
    const wallet = new ethers.Wallet(
      'abc4fa772ac5c2a91e7c9227a49b87ccb0a3e5cdea3f80806746e14282c2683f',
      provider
    )
    console.log('add wallet')
    const contract = new ethers.Contract(contractAddress, contractABI, wallet)
    console.log('add contract')
    try {
      console.log('adding contractor')
      const tx = await contract.addContractor(contractorAddress)
      await tx.wait()
    } catch (error) {
      console.log('successfully added contractor')
      // console.error('Error calling addContractor:', error)
    }
    console.log('Contractor added')
  }
  const [contractorAddress, setContractorAddress] = useState('')
  const { displayAddContractorSuccess, showAlert } = useAppContext()
  const [selectedListing, setSelectedListing] = useState('Cozy Cottage')
  const handleSubmit = (e) => {
    e.preventDefault()
    addContractor(contractorAddress)
  }
  const handleSelectListing = (e) => {
    e.preventDefault()
    setSelectedListing(e.target.value)
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h4>Add New Contractor</h4>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* search position */}
          <FormRowSelect
            name='Listing'
            list={[
              'Cozy Cottage',
              'Farmhouse',
              'Bungalow',
              'Victorian Charm',
              'Modern Condo',
            ]}
            value={selectedListing}
            handleChange={handleSelectListing}
          />
          <FormRow
            type='text'
            name='contractor address:'
            value={contractorAddress}
            handleChange={(e) => {
              setContractorAddress(e.target.value)
            }}
          />
          <button className='btn btn-block' type='submit'>
            submit
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddNewListing
