import { useState, useEffect} from "react";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import {useSelector, useDispatch} from 'react-redux';
import {login,reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner";
import axios from "axios";


function Login(){
     const [formData, setFormData] = useState({
        
        email: '',
        password: ''
         })

        const {email, password} = formData

        const dispatch = useDispatch();
        const navigate = useNavigate();

        const {user, isError,isSuccess,isLoading , message} = useSelector(state => state.auth)

        axios.defaults.withCredentials = true;

        
        useEffect(() => {
     
        axios.get('http://localhost:4000')
        .then(res => 
             {
              if(res.data.valid){

               navigate('/')
                  
              }else{
                navigate('/login')
              }
             })
        .catch(err => console.log(err))

       }, [])

        
        useEffect(() => {
            if(isError){
                toast.error(message)
            }

            //Redirect when logged in
            if(isSuccess || user){
                navigate('/')
               
            }

            dispatch(reset())
            
        }, [isError, isSuccess, user, message,navigate, dispatch])


        const onChange = (e) => {
            setFormData((prevState) => ({...prevState, [e.target.name]: e.target.value}))
        }

        const onSubmit = (e) => {
            e.preventDefault()

            const userData = {
                email,
                password
            }
            
            dispatch(login(userData))
        }



        if(isLoading){
            return <Spinner />
        }

         

        return(
            <>
            <section className="heading">
                <h1> 
                <FaSignInAlt /> Login
                </h1>
                <p> Please Login to Your Account</p>
            </section>
            <secttion className="form">
                <form onSubmit={onSubmit}>
                     
                    <div className="form-group">
                        <input type="email" className="form-control"
                        id='email'
                        name='email'
                        value={email}
                        onChange={onChange} 
                        placeholder='Enter your email'
                        required
                        />
                        </div>
                        <div className="form-group">
                        <input type="password" className="form-control"
                        id='password'
                        name='password'
                        value={password}
                        onChange={onChange}
                        placeholder='Enter your password'
                        required
                        />
                        </div>
                         
                        <div className="form-group">
                            <button className="button btn btn-block">Submit</button>

                        </div>
                </form>
            </secttion>
            </>
        )
     }
export default Login;
