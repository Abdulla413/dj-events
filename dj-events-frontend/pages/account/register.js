import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import AuthContext from '@/context/AuthContext'
import styles from '@/styles/AuthForm.module.css'



export default function RegisterPage() {
const [email, setEmail]=useState("")
const [username, setUserName]=useState("")
const [password, setPassword]=useState("")
const [password2, setPassword2]=useState("")

const {register, error}=useContext(AuthContext)


useEffect(()=>error && toast.error(error))


const handleSubmit= (e)=>{
    e.preventDefault()
    

    if(password !== password2 ){
      toast.error("Password do not match! ")
      return
    }
    register({username, email, password})

}



  return (
    <Layout title="User Login">
<div className={styles.auth}>
    <h1> <FaUser/>Register </h1>
    <ToastContainer />
    <form onSubmit={handleSubmit}>
    <label htmlFor='email'>User Name</label>
        <input 
        type="text" 
        id='username'
        value={username}
        onChange={(e)=>setUserName(e.target.value)}
        />
        <label htmlFor='email'>Email Address</label>
        <input 
        type="email" 
        id='email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <label htmlFor='password'>Password</label>
        <input 
        type="password" 
        id='password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <label htmlFor='password2'>Conform Password</label>
        <input 
        type="password" 
        id='password2'
        value={password2}
        onChange={(e)=>setPassword2(e.target.value)}
        />


        <input type="submit" value="Submit" className='btn' />

    </form>

    <p>If you have an account? <Link href="/account/login">Register</Link>  </p>

    


</div>
    </Layout>
  )
}
