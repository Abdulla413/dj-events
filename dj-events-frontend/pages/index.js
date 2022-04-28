import Layout from '@/components/Layout'
import {API_URL}from "@/config/index"
import EventItem from '@/components/EventItem'
import Link from "next/link"
import {useEffect, useState} from "react"

export default function Home({events}) {

 
  return (
    <Layout>
     <h1> Upcoming Events </h1>
     {events.length ===0 && <h3>No events to show</h3> }
     {events.map((evt)=>(
       <EventItem key={evt.id} evt={evt.attributes}/>
     ))}

{events.length>0 && (<Link href="/events">
<a className='btn-secondary'>View All Events</a>
</Link>)}
    </Layout>
  )


}

export async function getStaticProps(){
  const res= await fetch(`${API_URL}/events?sort=date:desc&pagination[limit]=3&populate=*`)
  
  const events= await res.json()


  return{
    props:{events:events.data},
    revalidate:1
  }
}