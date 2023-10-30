'use client'
import React, { useState } from 'react'
import style from '@styles/login-sign.module.css'
import Link from 'next/link'
import Video from 'next-video';
// import Videosrc from '/@assets/eventv1.mp4'




const Login = () => {
     const [loginData, setloginData] = useState({
        loginEmail: "", 
        loginPassword: ""
     })

      const handleInput = (e) => {
        setloginData({...loginData,[e.target.className]: e.target.value})
      }

      const handleSubmit = async(e) => {
        e.preventDefault(); 



        try{
            const res = await fetch('http://localhost:3000/api/Back', {
                method: 'POST',
    
                body: JSON.stringify(loginData)
            })

        }catch(error){
            console.error('fetch error')

        }

      
      }

      
  return (
    <div>
         <div className={style["logoWorthsec"]}>
                            <button className={style['worthsecAreabtn']} disabled>WORTHSEC</button>
                        </div>
         <div className={style["loginSection"]}>
            <div className={style["videoSection"]}>
                <div className={style["videoContent"]}>
                    {/* <Video src={Videosrc} width={200} height={200}/> */}
                </div>
            </div>
            <div className={style["loginContentArea"]}>
                <div className={style["loginContent"]}>
                   <div className={style["loginTitle"]}>
                   <h2>Login</h2> 
                  <hr />
                    </div>
                    <form onSubmit={handleSubmit}> 
                    
                    <div className={style["loginEmailPasswordArea"]}>
                            <div className={style["loginEmailName"]}>
                                    <input type="email" name="" id="" className="loginEmail"  onChange={handleInput} placeholder='Enter your Email'/>
                            </div>
                            <div className={style["loginPassword"]}>
                                <input type="password"  className="loginPassword" onChange={handleInput} placeholder='Enter your Password'/>
      
                            </div>
                    </div> 

                    <div className={style["loginbtnArea"]}>
                        <button className={style["loginBtn"]} onClick={handleSubmit}>
                            Create Account
                        </button>
                    </div>

                    </form>

                    <div className={style["redirectArea"]} >
                        <p className={style["noAccText"]}>No Account ?</p>
                        <Link href={'/signUp'}className={style["createAccLink"]} >Create New Account </Link>

                    </div>

                </div>
            </div>
        </div>
      
        
      
    </div>
  )
}

export default Login
