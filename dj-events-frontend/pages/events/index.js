import Layout from '@/components/Layout'
import {API_URL}from "@/config/index"
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'
import { PER_PAGE } from '@/config/index'


export default function EventsPage({events, page, total }) {

  console.log(total, "jemi evetns")

  
  return (
    <Layout>
     <h1> Events </h1>
     {events.length ===0 && <h3>No events to show</h3> }
     {events.map(evt=>(
       <EventItem key={evt.id} evt={evt.attributes}/>
     ))}

<Pagination page={page} total={total} />
    </Layout> 
  )


}

export async function getServerSideProps({query:{page=1}}){
  // Calculate start page

  const start = +page ===1 ?  0 : (+page-1) * PER_PAGE 

  // Fetch total / count

  // const totalRes= await fetch(`${API_URL}/events/count`)
  // const total= await totalRes.json()

  // console.log(total, "jami")
  


// Fetch events 

  const res= await fetch(`${API_URL}/events?sort=date:ASC&pagination[limit]=${PER_PAGE}&pagination[start]=${start}&populate=*`)
  const events= await res.json()
  console.log(events, "is there any meta")
  

  return{
    props:{events:events.data, page:+page, total:events.meta.pagination.total}  }
} 