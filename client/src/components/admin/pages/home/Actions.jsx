import React,{useState} from 'react'
import VerDots from '../../../../assets/images/VarDots.svg'
import { useEditPaymentMutation } from '../../../../slices/paymentApiSlice'

const Actions = ({paymentId}) => {

  const [showOptions,setShowOptions] = useState(false)


  const [editPayment, {isLoading}] = useEditPaymentMutation()


  const approveHandler = async () => {
    setShowOptions(false)
    const data = {
      paymentId,
      status:'approved'
    }
    const apiRes = await editPayment(data).unwrap();
    // console.log("apiRes", apiRes)

  }
  const rejectHandler = async () => {
    setShowOptions(false)
    const data = {
      paymentId,
      status:'rejected'
    }
    // console.log("Rejected")

    const apiRes = await editPayment(data).unwrap();
    // console.log("apiRes", apiRes)
  }

  


  return (
    <div className='relative'>
      <img onClick={(e => setShowOptions(!showOptions))} className='cursor-pointer' src={VerDots} alt="" />
      
      {showOptions && <>
        <div className='absolute w-[120px] rounded bg-gray-700 right-0'>
          <ul className='flex flex-col px-2'>
            <li onClick={approveHandler} className='cursor-pointer px-4 py-2 text-center border-b border-gray-300'>Approrve</li>
            <li onClick={rejectHandler} className='cursor-pointer px-4 py-2 text-center'>Reject</li>
          </ul>
        </div>
      </>}
      
      


    </div>
  )
}

export default Actions