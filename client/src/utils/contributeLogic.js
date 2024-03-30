import { ethers } from 'ethers'

const handleButtonClick = async (amount) => {
  /*
  const OUR_HOME_WALLET_ADDR = '0xdE4F8cA5894F7661C608C5Ff0a661925aE52676C'
  console.log('Contribute button clicked')
  // Check if MetaMask is installed
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed')
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    // Request access to account
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    console.log('Account access granted')

    // Your contract's ABI
    const tokenAbi = [
      {
        inputs: [
          { internalType: 'address', name: 'spender', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ]

    const tokenAddress = '0xdE4F8cA5894F7661C608C5Ff0a661925aE52676C'
    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer)
    console.log('Token Contract Created')
    const approveTx = await tokenContract.approve(
      OUR_HOME_WALLET_ADDR,
      ethers.parseUnits(amount, 18)
    )

    console.log('Approve Tx Created')

    await approveTx.wait()

    console.log('Approval confirmed')
    console.log('Approval tx:', approveTx.hash)

    const OUR_HOME_ABI = [
      {
        inputs: [
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ]

    const ourHomeContract = new ethers.Contract(
      OUR_HOME_WALLET_ADDR,
      OUR_HOME_ABI,
      signer
    )
    const transferTx = await ourHomeContract.transfer(
      ethers.parseUnits(amount, 18)
    )
    await transferTx.wait()
  } else {
    console.error('MetaMask not found')
  }
  */
  if (typeof window.ethereum === 'undefined') {
    console.error('MetaMask not installed')
    return
  }
  const provider = new ethers.BrowserProvider(window.ethereum)
  console.log('add provider')
  const signer = await provider.getSigner()
  console.log('add signer')
  const recipientAddress = '0x19Dd19eB32eb4F90E7c855A4d97BB5E0eB5f838B'
  const transaction = {
    to: recipientAddress,
    value: amount,
  }
  signer
    .sendTransaction(transaction)
    .then((tx) => {
      console.log('Transaction sent:', tx)
    })
    .catch((error) => {
      console.error('Error sending transaction:', error)
    })
}

export default handleButtonClick
