import React,{useRef,useState,useContext} from 'react'
import './Conexion.css'
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import {ContextFirebase} from './ContextFirebase'



const Conexion = () => {

    let history = useHistory();
    const activeRef = useRef(null)
    const firebase = useContext(ContextFirebase)

   
    const data ={
        username: '',
        email: '',
        password : '',
        confirmPassword : ''

    }
    const data2 ={
        email2: '',
        password2 : '',
    }
    const [loginData, setloginData] = useState(data);
    const [loginData2, setloginData2] = useState(data2);
    const [error, setError] = useState('')
    const [error2, setError2] = useState('')
    const {auth}= firebase

    const {email,password,username} = loginData;
    const {email2,password2} = loginData2;
    const handleChange = (e) =>{
        setloginData({...loginData, [e.target.id] : e.target.value });
    }
    const handleChange2 = (e) =>{
        setloginData2({...loginData2, [e.target.id] : e.target.value });
    }
    const handleSubmit = (e) => {
        // permet d'envoyer l'email et le mot de passe sur le serveur de firebase pour l authentification
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)

        .then (() =>{
            setloginData({ ...data})
            alert(`Utilisateur ${username} a été crée avec succès`)
            history.push('/')
          })
          .catch (error =>{
            setError(error)
        })
        
        // permet d'envoyer les information chez firestore

    }
    const handleSubmit2 = (e) => {
        // permet d'envoyer l'email et le mot de passe sur le serveur de firebase pour l authentification
        e.preventDefault();
        
        auth.signInWithEmailAndPassword(email2, password2)
        
        .then (() =>{
            setloginData({ ...data})
            history.push('/')
          })

        // permet d'envoyer les information chez firestore
        .catch (error =>{
            console.log(error);
            setError2(error)
        })

       



    }
    

    const errorMsg =   error !== '' && <span>{error.message} </span>
    const errorMsg2 =   error2 !== '' && <span>{error2.message} </span>





    return (

        <>
        <h3 className="error" > {errorMsg2} </h3> 
        <h3 className="error"> {errorMsg} </h3>
        <section>
            
           <div className="containerr" ref={activeRef}>
               <div className="user signinBox">
                   <div className="imgBx"> <img src="https://images.pexels.com/photos/4319752/pexels-photo-4319752.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt=""/> </div>
                   <div className="formBx">
                       <form onSubmit={handleSubmit2} >
                           <h2>Sign In</h2>
                           <input onChange={handleChange2} type="email" name="email" value={email2} placeholder="email" id="email2" />
                           <input onChange={handleChange2} type="password" name="password" value={password2} placeholder="password" id="password2" />
                           
                           <input type="submit" name="" placeholder="login"  value="Sign In"/>
                           <div className="signup">
                              <p>Don't have an account ? <Link to="conexion" onClick={()=> activeRef.current.classList.toggle('active')} >Sign Up</Link></p> 
                           </div>
                       </form>
                   </div>
               </div>
               <div className="user signupBox">
                   <div className="formBx">
                       <form onSubmit={handleSubmit} >
                           <h2>Create an Account</h2>
                           <input onChange={handleChange} type="text" value={username}  placeholder="Username" id="username" required />
                           <input onChange={handleChange} type="email" value={email}  placeholder="Email Adress" id="email" required/>
                           <input onChange={handleChange} type="password" value={password}  placeholder="Password"  id="password" required />
                           <input type="password"  placeholder="Confirm password" id="confirmPassword" required />
                           <input type="submit"  placeholder="login" value="Sign Up"  />
                           <div className="signup">
                             <p>already have an account ? <Link to="conexion" onClick={()=> activeRef.current.classList.toggle('active')}>Sign In</Link> </p>   
                           </div>
                       </form>
                   </div>
                   <div className="imgBx"> <img src="https://images.pexels.com/photos/1162519/pexels-photo-1162519.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt=""/> </div>

               </div>
           </div>
       </section>
        
        </>
       
    )
}

export default Conexion
