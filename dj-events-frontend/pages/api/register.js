import { API_URL } from "@/config/index";
import cookie from "cookie"



export default async (req, res)=>{
    if(req.method === "POST"){

        const {username, email, password} = req.body
        
        const strapiRes=await fetch(`${API_URL}/auth/local/register`, {
            method:"POST", 
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username, 
                email,
                password,
            }),  
        })

        const data= await strapiRes.json()
          
        if(strapiRes.ok){
            // Set cookie

            res.setHeader(
                "Set-Cookie",                 
                cookie.serialize("token", data.jwt, {
                httpOnly:true,
                secure:process.env.NODE_ENV !== "devlopment",
                maxAge: 60*60*24*10, 
                sameSite:"strict",
                path:"/",

            })
            )
            
            res.status(200).json({user:data.user})
            

        }else{
            res
            .status(data.error.status)
            .json({message:data.error.message})
        }
        
       

    } else {
        res.setHeader("Allowed", ["POST"])
        res.status(405).json({message:`Method ${req.mesthod} not allowed`})
    }
}