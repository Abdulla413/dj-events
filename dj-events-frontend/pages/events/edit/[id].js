import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import {useState} from "react"
import {useRouter} from "next/router"
import Link from "next/link"
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import ImageUpload from "@/components/ImageUpload";

export default function EditEventPage({evt}) {
    
  
const [values, setValues]=useState({
  name:evt.attributes.name,
  performers:evt.attributes.performers, 
  venue:evt.attributes.venue, 
  address:evt.attributes.address, 
  date:evt.attributes.date, 
  time:evt.attributes.time, 
  description:evt.attributes.description, 

})

const router =useRouter();

const [imagePreview, setImagePreview]=useState(
  evt.attributes.image.data?
  evt.attributes.image.data.attributes.formats.thumbnail.url:null
  )

const [showModal, setShowModal]=useState(false)  

const handleSubmit = async (e)=>{
  e.preventDefault()
  
  // validation

  const hasEmpityFields=Object.values(values).some(
    (element)=>element===""
    )

  if (hasEmpityFields){
    toast.error("Please fill in all fields")
  }

  const res = await fetch(`${API_URL}/events/${evt.id}`, {
    
    method:"PUT", 
    headers:{
    "Content-Type":"application/json"
  },
    body:JSON.stringify({data:values}),
  })


  if (!res.ok){
    toast.error("Something went wrong")
  }else{
    const evt=await res.json()
  
    router.push(`/events/${evt.data.attributes.slug}`)
  }
}


const hanleInputChange=(e)=>{
  const {name, value}=e.target
  setValues({...values, [name]:value})

}

const imageUploaded = async(e)=>{
  const res= await fetch(`${API_URL}/events/${evt.id}`)
  const data=await res.json()

  // setImagePreview(data.image.data.attributes.formats.thumbnail.url)
  setShowModal(false)
}


  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
       <h1> Edit Event</h1>
       <ToastContainer/>
       <form onSubmit={handleSubmit} className={styles.form}>
         <div className={styles.grid}>
           <div>
            <lable htmlFor="name">Event Name</lable>
           <input type="text" id="name" name="name" value={values.name}  onChange={hanleInputChange}/>
           </div>
           <div>
            <lable htmlFor="performers">Performers</lable>
           <input type="text" id="performers" name="performers" value={values.performers}  onChange={hanleInputChange}/>
           </div>
           <div>
            <lable htmlFor="venue">Venue</lable>
           <input type="text" id="venue" name="venue" value={values.venue}  onChange={hanleInputChange}/>
           </div>
           <div>
            <lable htmlFor="address">Address</lable>
           <input type="text" id="address" name="address" value={values.address}  onChange={hanleInputChange}/>
           </div>
           <div>
            <lable htmlFor="date">Date</lable>
           <input type="date" id="date" name="date" value={moment(values.date).format("yyyy-MM-DD")}  onChange={hanleInputChange}/>
           </div>
           <div>
            <lable htmlFor="time">Time</lable>
           <input type="text" id="time" name="time" value={values.time}  onChange={hanleInputChange}/>
           </div>

         </div>

         <div>
         <lable htmlFor="description">Description</lable>
           <textarea type="text" id="description" name="description" value={values.description}  onChange={hanleInputChange}/>
          
           
         </div>

        <input type="submit" value="Update Event" className="btn"/>

       </form>

       <h2>Event Image</h2>
       {imagePreview?(<Image src={imagePreview} height="100" width="170" />
       ):
       (<div>
         <p>No Image Uploded</p>
       </div>)
       }

<div>
  <button onClick={()=>setShowModal(true)} className="btn-secondary">
<FaImage/> Set Image
  </button>
</div>
<Modal show={showModal} onClose={()=>setShowModal(false)}>
<ImageUpload evtId={evt.id} imageUploaded={imageUploaded}/>
</Modal>

</Layout>
  )
}


export async function getServerSideProps({params:{id}, req}){

    const res =await fetch(`${API_URL}/events?filters[id][$eq]=${id}&populate=*`)
    const data= await res.json();
    // console.log(req.headers.cookie)
  
    return{
        props:{
            evt:data.data[0]
        }

    }
}