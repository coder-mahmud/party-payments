import React from 'react'
import { useGetAllPaymentsQuery } from '../slices/paymentApiSlice'
import { useGetAdminsQuery } from '../slices/userApiSlice';
import Loader from '../components/shared/Loader';
import dayjs from 'dayjs'

const List = () => {

  const {data,isLoading,isError} = useGetAllPaymentsQuery();
  const {data:adminsData,isLoading:isAdminsLoading,isError:isAdminsError} = useGetAdminsQuery();


  if(isLoading || isAdminsLoading){
    return <Loader />
  }

  // console.log("data",data)
  // console.log("adminsData",adminsData)
  const allPayments = data.payments;
  const allAdmins = adminsData.data;
  console.log("Info", allPayments)

  return (
    <>
      <div className=' bg-gray-800 text-white border-b border-gray-500 min-h-[90vh] py-10'>
        <div className="container py-3">
          <h1 className='text-3xl mb-2'>All Payments:</h1>
          <h2 className='text-xl mb-4'>Total Payments: {allPayments.length}</h2>

          <div className="payments_wrap overflow-x-auto pb-10">

          <div className="hidden lg:flex payment-row border-b border-gray-500 py-6 flex-col lg:flex-row justify-between gap-3 ">
            <p className='flex-[1.3]'><strong>Name:</strong> </p>
            <p className='flex-[1]'><strong>Roll:</strong> </p>
            
            <p className='flex-[1]'><strong>Date:</strong></p>
            

            <p className='flex-[1]'><strong>Paid to:</strong> </p>

            
            <p className='flex-[1]'><strong>Status:</strong> </p>

          </div>




            {allPayments?.map((payment) => {
              const user = allAdmins?.find((u) => u._id === payment.paidTo);

              return (
                <div key={payment._id} className="payment-row border-b border-gray-500 py-6 flex flex-col lg:flex-row justify-between gap-3 ">
                  <p className='flex-[1.3]'><strong className='block lg:hidden'>Name: </strong>{payment.name}</p>
                  <p className='flex-[1]'><strong className='block lg:hidden'>Roll: </strong> {payment.collegeRoll}</p>
                  
                  <p className='flex-[1]'><strong className='block lg:hidden'>Date: </strong> { dayjs(payment.createdAt).format('DD/MM/YYYY hh:mm A') }</p>
                  

                      <p className='flex-[1]'><strong className='block lg:hidden'>Paid to: </strong>{user.firstName} {user.lastName}</p>

                  
                  <p className='flex-[1]'><strong className='block lg:hidden'>Status: </strong>{payment.status == 'approved' ? "Approved" : payment.status == 'pending' ? "Pending" : "Rejected" }</p>

                </div>
              );
            })}






              {/* <div className="image"></div>
              <div className="roll"></div>
              <div className="paidto"></div>
              <div className="paymentDate"></div> */}




          </div>
        </div>
      </div>    
    </>
  )
}

export default List