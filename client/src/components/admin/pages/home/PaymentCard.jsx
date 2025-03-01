import React,{useState} from 'react'
import dayjs from 'dayjs'
import ImageModal from './ImgModal';

import Actions from './Actions';

const PaymentCard = ({payment}) => {
  const [isModalOpen,setIsModalOpen] = useState(false)
  
  const ImageModal = ({ isOpen, onClose, imageUrl }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="relative max-w-4xl max-h-[90vh] w-full overflow-y-auto pt-20">
          <button 
            className="absolute top-8 right-0 text-white text-xl font-bold p-2 "
            onClick={onClose}
          >  ✕ </button>
          <img 
            src={imageUrl} 
            alt="Payment Screenshot" 
            className="w-[500px] block mx-auto h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    );
  }; 

  return (
    <div key={payment._id} className="paymentRow flex gap-6 justify-between items-center py-6 border-b border-gray-500">
      <div  className="flex-[2] flex ">{payment.name}</div>
      <div  className="flex-[1] flex ">{payment.collegeRoll}</div>
      <div  className="flex-[1.5] flex ">{ dayjs(payment.createdAt).format('DD/MM/YYYY hh:mm A') }</div>
      
      <div  className="flex-[1] flex "> <img className="w-12 h-12 rounded-[100%]" src={payment.imageUrl} alt="" />  </div>
      <div  className="flex-[1] flex justify-center">
        <img className="w-auto h-10" src={payment.screenshotUrl} alt="" onClick={() => setIsModalOpen(true)} />
        <ImageModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={payment.screenshotUrl}
      />
      
      </div>
      <div className="flex-[1] flex ">{payment.status}</div>
      <div className="flex-[1] flex "><Actions paymentId={payment._id} /> </div>
    </div>
  )
}

export default PaymentCard