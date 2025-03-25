'use client';
import React, { useEffect, useState } from 'react';
import style from '@styles/login-sign.module.css';
import { useRouter } from 'next/navigation';
const Signup = () => {
    // displays a message if the password data is empty or does not match 
    const [showmismatch, setshowmisMatch] = useState(false);
    const [emptyinput, setemptyInput] = useState(false);
    const [userexist, setUserexist] = useState(false);
    const router = useRouter();
    const [register, setRegister] = useState({
        userName: "",
        userEmail: "",
        userPassword1: "",
        userPassword2: ""
    });
    const handleInput = (e) => {
        setRegister({ ...register, [e.target.className]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(register.userPassword1)
        if (register.userPassword1 === "" || register.userPassword2 === "") {
            setemptyInput(true);
            setshowmisMatch(false);
            return;
        }
        if (register.userPassword1 !== register.userPassword2 || register.userPassword1 === "") {
            setshowmisMatch(true);
            setemptyInput(false);
            return;
        }
        try {
            const res = await fetch('http://localhost:3000/api/signUpAcc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the content-type to JSON
                },
                body: JSON.stringify(register)
            });
            const data = await res.json();
            if (res.ok && data.message === "new user created") {
                router.push('/');
            }
            else if (!res.ok && data.message === "User already Exist") {
                setUserexist(true);
            }
            else {
            }
        }
        catch (error) {
            console.error('fetch failed');
        }
    };
    return (<div>
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
                                    <input type="text" className='userName' onChange={handleInput} placeholder='Enter your Username'/>
                                    <input type="text" className='userEmail' onChange={handleInput} placeholder='Enter your Email'/>
                            </div>
                            <div className={style["signUPassword"]}>
                                <input type="password" className="userPassword1" onChange={handleInput} placeholder='Enter your Password'/>
                                <input type="password" className="userPassword2" onChange={handleInput} placeholder='Please Repeat your Password'/>
                            </div>
                            <div className='errorMessage'>
                            {showmismatch && (<div className={style["password-mismatch"]}>
                                         <div className={style["password-mismatch-content"]}>
                                         Password does not match
                                    </div>  
                                    </div>)}
                            {emptyinput && (<div className={style["password-mismatch"]}>
                                    <div className={style["password-mismatch-content"]}>
                                            Password field is empty
                                    </div>
                                    
                                </div>)}
                            </div>
                            {userexist && (<div>
                                     <div className={style["userExist"]}>
                                    <div className={style["userExistContent"]}>
                                            Username already exist
                                    </div>
                                    
                                </div>

                                </div>)}
                           
                           

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
      
    </div>);
};
export default Signup;
