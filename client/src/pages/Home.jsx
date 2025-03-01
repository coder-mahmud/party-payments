import React,{useState, useEffect} from 'react'
import Loader from '../components/shared/Loader'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useCreatePaymentMutation } from '../slices/paymentApiSlice'
import { useGetAdminsQuery } from '../slices/userApiSlice'

const Home = () => {

  const [name, setName] = useState('')
  const [roll, setRoll] = useState('')
  const [screenshotUrl, setScreenshotUrl] = useState('')
  const [paidTo, setPaidTo] = useState('')
  const [mobile, setMobile] = useState('')
  const [message, setMessage] = useState('')
  const [imageUrl, setImageUrl] = useState("");
  const [showLoader, setShowLoader] = useState(false);


  const dispatch = useDispatch()
  const [createPayment,{isLoading,isError}] = useCreatePaymentMutation()

  const { data, isLoading: adminsLoading, isError: isAdminsError, error: adminsError } = useGetAdminsQuery();

  const uploadImage = async (file) => {
    
    const formData = new FormData();
    formData.append("file",file);
    formData.append("upload_preset", "ml_default");
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dijb4fddq/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("data",data)
      toast.success("File uploading successful!");
      return data.secure_url;
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed! Please try again.");
    }finally{
      
    }
  }


  const handleFileChange = async (e) => {
    setShowLoader(true)
    const uploadedUrl = await uploadImage(e.target.files[0])
    console.log("uploadedUrl", uploadedUrl)
    setImageUrl(uploadedUrl)
    setShowLoader(false)
  };

  const handleScreenshotChange = async (e) => {
    setShowLoader(true)
    const uploadedUrl = await uploadImage(e.target.files[0])
    console.log("uploadedUrl", uploadedUrl)
    setScreenshotUrl(uploadedUrl)
    setShowLoader(false)
  };


  const formHandler = async (e) => {
    setShowLoader(true)
    e.preventDefault();
    console.log("Name",name, roll, paidTo,mobile, message,imageUrl, screenshotUrl )
    const data = {
      // name, collegeRoll:roll, mobile, message,imageUrl, screenshotUrl
      name, collegeRoll:roll, paidTo,mobile, message,imageUrl, screenshotUrl
    }

    try {
      const apiRes = await createPayment(data).unwrap();
      console.log("apiRes", apiRes)
      toast.success("Form submission successful!")
    } catch (error) {
      console.log("error", error)
      toast.error(error.data.message)
      // toast.error("Something went wrong! Please try again.")
    }finally{
      setShowLoader(false)
    }
    


  }

  useEffect(() => {

  },[])

  if(adminsLoading){
    return <Loader />
  }

  // console.log("data",data)

  return (
    <>
      {showLoader && <Loader />}
      
      <div className=' bg-gray-800 text-white border-b border-gray-500 min-h-[90vh] py-10'>
        <div className="container py-3">
          <h1 className='text-center font-medium text-2xl mb-2'>Welcome friend!</h1>
          <p className='text-center font-semibold'>If you have made payment for the iftar party, Please fill the form below to get acknowledged!</p>

          <form onSubmit={formHandler} className='payment_form w-[500px] max-w-[90%] border border-gray-500 rounded p-6 mx-auto mt-8' action="">
            
            <div className='form_group flex flex-col gap-2 mb-6'>
              <label htmlFor="name">Name:</label>
              <input className='border border-[#aaa] rounded py-2 px-4' id="name" type="text" placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value) } required/>
            </div>

            <div className='form_group flex flex-col gap-2 mb-6'>
              <label htmlFor="roll">College Roll:</label>
              <input className='border border-[#aaa] rounded py-2 px-4' id="roll" type="number" placeholder='Your College Roll' value={roll} onChange={(e) => setRoll(e.target.value) } required/>
            </div>

            <div className='form_group flex flex-col gap-2 mb-6'>
              <label htmlFor="mobile">Mobile:</label>
              <input className='border border-[#aaa] rounded py-2 px-4' id="mobile" type="number" placeholder='Your Mobile Number' required value={mobile} onChange={(e) => setMobile(e.target.value) } />
            </div>

            <div className='form_group flex flex-col gap-2 mb-6'>
              <label htmlFor="paidto">Paid to:</label>
              <select className='border border-[#aaa] rounded py-2 px-4' name="paidto" id="paidto" value={paidTo} onChange={(e) => setPaidTo(e.target.value)} required>
                <option value="">Please select one</option>
                {data.data.map(user =><option key={user._id} value={user._id}>{user.firstName} {user.lastName} ({user.collegeRoll})</option> )}



                {/* <option value="nasir">Nasir Uddin (1036048)</option>
                <option value="mahmud">Mahmudul Hasan (1036047)</option>
                <option value="nadim">Nadim (1036...)</option> */}
              </select>
            </div>


            <div className='form_group flex flex-col gap-2 mb-6'>
              <label htmlFor="screenshot">Upload headshot:</label>
              <input  className='fileUpload' id="screenshot" type="file" accept="image/*"  onChange={handleFileChange} />
              {imageUrl && <img src={imageUrl} alt="Uploaded" width="200px" />}
            </div>

            <div className='form_group flex flex-col gap-2 mb-6'>
              <label htmlFor="screenshot">Payment screenshot/image:</label>
              <input  className='fileUpload' id="screenshot" type="file" accept="image/*" placeholder='Image here' onChange={handleScreenshotChange} />
              {screenshotUrl && <img src={screenshotUrl} alt="Uploaded" width="200px" />}
            </div>


            <div className='form_group flex flex-col gap-2 mb-6'>
              <label htmlFor="message">Message (optional):</label>
              <textarea 
                className='border border-[#aaa] rounded py-2 px-4 min-h-[100px] resize-y' 
                id="message" 
                placeholder='Message...' 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>        


            <div className='form_group flex flex-col gap-2 mb-6'>
              <button className='cursor-pointer h-11 flex items-center justify-center bg-gray-500 rounded '>Submit</button>
            </div>        




          </form>
        </div>  
      </div>  
    
    </>
  )
}

export default Home