'use client'
import React, { useState } from 'react'
import style from '@styles/login-sign.module.css'





const Signup = () => {
    const [register, setRegister] = useState({
        userName: "",
        userEmail: "",
        userPassword1: "", 
        userPassword2: ""

    })

    const handleInput = (e) => {

        setRegister({...register, [e.target.className]: e.target.value})
    }


    const handleSubmit = async(e) => {
        e.preventDefault(); 

        try{
            const res = await fetch('http://localhost:3000/api/Back', {
                method: 'POST', 
                body: JSON.stringify({register})
            })
            

            setRegister("")
       

           
        }catch(error){
            console.error('fetch failed')
        }



    }


  return (
    <div>
        
        <div className={style["signUpSection"]}>
            <div className={style["signContentArea"]}>
                <div className={style["signUpContent"]}>
                   <div className={style["signUpTitle"]}>
                   <h2>Sign Up</h2> 
                   <hr />
                    </div>
                        <form onSubmit={handleSubmit}> 
                    <div className={style["signUpEmailNamePasswordArea"]}>
                            <div className={style["signUpEmailName"]}>
                                    <input type="text"  id="" className='userName' onChange={handleInput} placeholder='Enter your Username'/>
                                    <input type="email" name="" id="" className='userEmail' onChange={handleInput} placeholder='Enter your Email'/>
                            </div>
                            <div className={style["signUPassword"]}>
                                <input type="password"  className='userPassword1'  onChange={handleInput}   placeholder='Enter your Password'/>
                                <input type="password" className='userPassword2'  onChange={handleInput}  placeholder='Please Repeat your Password'/>
                            </div>
                    </div> 
                    <div className={style["signUpUsercreateArea"]}>
                        <button className={style["submitBtn"]} onClick={handleSubmit}>
                            <p>Create Account</p>
                        </button>
                    </div>

                    </form>

                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Signup
