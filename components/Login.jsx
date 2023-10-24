import React from 'react'
import style from '@styles/login-sign.module.css'
import Link from 'next/link'
import Video from 'next-video';
// import Videosrc from '/@assets/eventv1.mp4'




const Login = () => {
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
                    <div className={style["loginEmailPasswordArea"]}>
                            <div className={style["loginEmailName"]}>
                                    <input type="email" name="" id="" className={style["loginEmail"]} placeholder='Enter your Email'/>
                            </div>
                            <div className={style["loginPassword"]}>
                                <input type="password"  className={style["loginpassword"]} placeholder='Enter your Password'/>
      
                            </div>
                    </div> 

                    <div className={style["loginbtnArea"]}>
                        <button className={style["loginBtn"]}>
                            Create Account
                        </button>
                    </div>

                    <div className={style["redirectArea"]} >
                        <p className={style["noAccText"]}>No Account ?</p>
                        <Link href={'/SignUp'}className={style["createAccLink"]} >Create New Account </Link>

                    </div>

                </div>
            </div>
        </div>
      
        
      
    </div>
  )
}

export default Login
