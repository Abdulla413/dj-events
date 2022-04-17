import Layout from "@/components/Layout";
import {useState} from "react"
import {useRouter} from "next/router"
import Link from "next/link"
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddEventPage() {
const [values, setValues]=useState({
  name:"",
  performers:"", 
  venue:"", 
  address:"", 
  date:"", 
  time:"", 
  description:"", 

})

const router =useRouter();

const handleSubmit = async (e)=>{
  e.preventDefault()
  
  // validation

  const hasEmpityFields=Object.values(values).some((element)=>element==="")
  if(hasEmpityFields){
    toast.error("Please fill in all fields")
  }

  const res = await fetch(`${API_URL}/events`,
  {method:"POST", 
  headers:{
    "content-type":"application/json"},
    body:JSON.stringify(values)
  })
  if (!res.ok){
    toast.error("Something went wrong")
  }else{
    const evt=await res.json()
    router.push(`/events/${evt.slug}`)

  }


}
const hanleInputChange=(e)=>{
  const {name, value}=e.target
  setValues({...values, [name]:value})

}


  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
       <h1> Add Event</h1>
       <ToastContainer/>
       <form onSubmit={handleSubmit} className={styles.form}>
         <div className={styles.grid}>
           <div>
            <lable htmlFor="name">Event Name</lable>
           <input type="text" id="name" name="name" value={values.name}  onChange={hanleInputChange}/>
           </div>
           <div>
            <lable htmlFor="performers">performers</lable>
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
           <input type="date" id="date" name="date" value={values.date}  onChange={hanleInputChange}/>
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

        <input type="submit" value="Add event" className="btn"/>

       </form>
         </Layout>
  )
}
