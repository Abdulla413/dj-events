import Head from "next/head"
import React from 'react'
import styles from "@/styles/Layout.module.css"
import Header from "./Header"
import Footer from "./Footer"
import Showcase from "./Showcase"
import {useRouter} from "next/router"

export default function Layout({title, keywords, description, children}) {
  const router = useRouter()
  return (
    <div>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}/>
        </Head>
        <Header/>
       {router.pathname==="/" && <Showcase/>}
        <div className={styles.container}>
        {children}
        </div>
        <Footer/>
    </div>
  )
}

Layout.defaultProps={
   title: "DJ Events | Frind the hottest party",
   description: "Find the latest DJ and other musical evetns",
   keywords: "music, dj, edm, events",
}
