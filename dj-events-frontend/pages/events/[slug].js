import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import styles from "@/styles/Event.module.css"
import Link from "next/link"
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Image from 'next/image'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from 'next/router'
import { useRouter } from 'next/router'




export default function EventPage({evt}) {

  const router = useRouter()

  const deleteEvent =async (e)=>{
   if(confirm("Are you sure?")){
     const res=await fetch(`${API_URL}/events/${evt.id}`, 
     {
     method :"DELETE",
    })
    const data=await res.json()
    if(!res.ok){
      toast.error(data.message)
    }else{
      router.push("/events")
    }
   }
  }
  return (
    <Layout title="Event Page">
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a> <FaPencilAlt/> Edit Event</a>
           </Link>
           <a href='#' className={styles.delete} onClick={deleteEvent}> <FaTimes/> Delete Event</a>
      
        </div>
      
         <span>{new Date(evt.attributes.date).toLocaleDateString("en-DE")} at {evt.attributes.time}</span>
         <h1>{evt.attributes.name}</h1>
         <ToastContainer/>
         {evt.attributes.image.data && (
        <div className={styles.image}> <Image src={evt.attributes.image.data.attributes.formats.medium.url} width={960} height={600}/> </div>
      )}
      <h3>Performers:</h3>
      <p>{evt.attributes.performers}</p>
      <h3>Description:</h3>
      <p>{evt.attributes.description}</p>
      <h3>Venue:{evt.attributes.venue}</h3>
      <p>{evt.attributes.address}</p>

      <Link href="/events" className={styles.back}>
        <a >
          {"<"}
        Go Back Events
        </a>
        </Link>
      
      </div>
    </Layout>
  )
}
// export async function getStaticPaths(){
//   const res= await fetch(`${API_URL}/events`)
//   const data=await res.json()
//   const events = data.data
//   console.log(events, "data tata")

//   const paths = events.map(evt=>({
//     params:{slug:evt.attributes.slug}
//   }))

  
//   console.log(paths, " yes i am 789")

  
//   return{
//     paths,
//     fallback:true
//   }
// }

// export async function getStaticProps({params:{slug}}){
// const res=await fetch(`${API_URL}/events?slug=${slug}&populate=*`)
// const data=await res.json()
// const events=data.data
// console.log(events, "456789")
// return{
//   props:{
//     evt:events
//   },
//   revalidate: 1

// }
// }



export async function getServerSideProps({query:{slug}}){
const res=await fetch(`${API_URL}/events?filters[slug][$eq]=${slug}&populate=*`)
const data=await res.json()
const events=data.data

return{
  props:{
    evt:events[0]
  }
}
}