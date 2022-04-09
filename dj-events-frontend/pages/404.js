import Link from "next/link"
import Layout from "@/components/Layout"
import {FaExclamationTriangle} from "react-icons/fa"
import styles from "@/styles/404.module.css"


import React from 'react'

export default function NotFoundPage() {
  return (
      <Layout>
    <div className={styles.error}> 
    <h1>
    <FaExclamationTriangle/>
    404</h1>
    <h4>Sorry, we can not found the page</h4>
    <Link href="/">Go Back Home</Link>
    </div>
    </Layout>
  )
}
