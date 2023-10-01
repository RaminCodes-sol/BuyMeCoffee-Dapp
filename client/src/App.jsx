import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { contract } from './contractUtils'
import { SiBuymeacoffee } from "react-icons/si"
import { BrowserProvider } from 'ethers/providers'



const App = () => {
  const [amount, setAmount] = useState('')
  const [signer, setSigner] = useState(null)
  const [accountAddress, setAccountAddress] = useState('')
  const [contractBalance, setContractBalance] = useState('')


  
  /*-------Connect-To-Wallet-------*/
  const connectToWallet = async () => {
    try {
      if (window.ethereum) {
        // await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new BrowserProvider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner()
        setSigner(signer)

        const { address } = await signer
        setAccountAddress(address)
        console.log('Account:', address)
      } else {
        throw new Error("MetaMask extension not detected")
      }
    } catch(error) {
      console.log(error)
    }
  }

  
  /*-------Contract-Instance-------*/
  const contractInstance = new ethers.Contract(contract.address, contract.ABI, signer)
  


  /*-------Get-Contract-Balance-------*/
  const getContractBalance = async () => {
    try {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum)
        const balance = await provider.getBalance(contract.address)
        setContractBalance(ethers.formatEther(balance))
      }
    } catch (error) {
      console.log("Error:", error)
    }
  }



  /*-------Buy-Coffee-------*/
  const buyCoffee = async () => {
    try {
      const buy = await contractInstance.buyCoffee({ value: ethers.parseEther(amount)})
      await buy.wait()
      getContractBalance()
      setAmount('')
    } catch(error) {
      console.log(error)
      alert('Error Buying Coffee.')
    }
  }


  /*-------Withdraw-------*/
  const withdraw = async () => {
    try {
      const withdraw = await contractInstance.withdraw()
      await withdraw.wait()
      getContractBalance()
    } catch(error) {
      console.log(error)
      alert('Error Withdrawing.')
    }
  }


  useEffect(() => {
    connectToWallet()
    getContractBalance()
  },[])



  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col border rounded-md border-gray-600 w-full max-w-[600px] p-5">

        <div className="w-full flex justify-between items-center mb-7">
          <h2 className="text-lg text-[#715df6] flex items-center">Buy Me <span className="inline-block text-[brown] text-3xl"><SiBuymeacoffee /></span></h2>
          { accountAddress && <button className="bg-orange-600 cursor-auto p-2 rounded-lg text-base">{`${accountAddress.slice(0,6)}....${accountAddress.slice(-4)}`}</button>}
        </div>

        <div className="w-full flex flex-col">
          <input type='text' placeholder="0.1 ETH" value={amount} onChange={(e) => setAmount(e.target.value)} className="px-2 py-5 text-black border-none focus-within:outline-8 outline-orange-600"/>
          <button onClick={buyCoffee} className="bg-green-700 p-3 mt-7 mb-4 transition-colors hover:bg-green-800">Buy Me Coffee</button>
          <button onClick={withdraw} className="bg-blue-700 p-3 transition-colors hover:bg-blue-800">Withdraw</button>
        </div>
        
        <div className='mt-4'>
          <h3>Contract Balance: {contractBalance} ETH</h3>
        </div>

      </div>
    </main>
  )
}

export default App
