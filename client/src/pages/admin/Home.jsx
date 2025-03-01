import React,{useEffect} from 'react'
import { useEditPaymentMutation } from '../../slices/paymentApiSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useGetAllPaymentsQuery } from '../../slices/paymentApiSlice'
import Loader from '../../components/shared/Loader'
import { clearCredential } from '../../slices/authSlice'
import { useNavigate } from 'react-router-dom'

import PaymentCard from '../../components/admin/pages/home/PaymentCard'


const AdminHome = () => {

  const userInfo = useSelector(state =>  state.auth.userInfo);
  console.log("userInfo from admin Home.jsx", userInfo)

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(()=> {
    if(!userInfo){
      dispatch(clearCredential())
      navigate('/login')
    }



  },[])

  let user, userId;
  if(userInfo){
    user = userInfo;
    // console.log("user", user)
    userId = user._id
  }
  
  
  // console.log("userId", userId)
  const {data, isLoading, isError} = useGetAllPaymentsQuery()

  if(isLoading){
    return <Loader />
  }
  console.log("Payments", data.payments)

  const userPayments = data.payments.filter(payment => payment.paidTo == userId)
  // console.log("userPayments", userPayments)


  let noPayemntText = ''
  if(userPayments.length == 0){
    return <>
      <div className=' bg-gray-800 text-white border-b border-gray-500 min-h-[90vh] py-10'>
        <div className="container py-3">
          <h1 className='font-normal text-2xl mb-4'>Welcome {user.firstName} {user.lastName }!</h1>
          <p className='text-xl'>Here you will find all payments requests those were made to you!</p>

          <div className='payments_wrap py-10'>         
            <p className="t">No payment made to you yet! Please come back later!</p>

          </div>

          
        </div>
      </div>    
    
    
    </>
  }




  return (
    <>
      <div className=' bg-gray-800 text-white border-b border-gray-500 min-h-[90vh] py-10'>
        <div className="container py-3">
          <h1 className='font-normal text-2xl mb-4'>Welcome {user.firstName} {user.lastName }!</h1>
          <p className='text-xl'>Here you will find all payments requests those were made to you!</p>

          <div className='payments_wrap py-10'>

          <div className="paymentRow flex gap-6 justify-between items-center font-semibold border-b border-gray-700 pb-4">
            <div className="flex-[2]  flex">Name</div>
            <div className="flex-[1]  flex">College Roll</div>
            <div className="flex-[1.5]  flex">Date</div>
            <div className="flex-[1]  flex"> Image  </div>
            <div className="flex-[1] justify-center flex">Screenshot</div>
            <div className="flex-[1]  flex">Status</div>
            <div className="flex-[1]  flex">Action</div>
          </div>

              {userPayments.map(payment => (
                <PaymentCard key={payment._id} payment={payment} />
              ))}
                              


          </div>

          
        </div>
      </div>
    </>
  )
}

export default AdminHome