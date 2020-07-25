import React, {useState} from 'react'
import {useGlobalState} from '../config/store'
import {loginUser} from '../services/authServices'

import '../styles/signIn.css'

const SignIn = ({history}) => {
    const initialFormState = {
        username: "",
        password: ""
    } 
    const [errorMessage, setErrorMessage] = useState(null);
    const [userDetails,setUserDetails] = useState(initialFormState)
    const {dispatch} = useGlobalState()

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        loginUser(userDetails)
        .then((user) => {
            dispatch({
                type: "setLoggedInUser",
                data: userDetails.username
                })
            history.push("/");
        })
        .catch(error => {
            console.error(error)
            setErrorMessage("Login failed. Please check your username and password");
        })
        
    }
   
    
       


    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <p className={{color: 'red'}}>{errorMessage}</p>}
            <div className="divStyles">
                <label className="labelStyles">Username</label>
                <input className="inputStyles" required type="text" name="username" placeholder="Enter a username" onChange={handleChange}></input>
            </div>
            <div className="divStyles">
                <label className="labelStyles">Password</label>
                <input className="inputStyles" required type="password" name="password" placeholder="Enter a password" onChange={handleChange}></input>
            </div>
            <input type="submit" value="Login"></input>
            
        </form>
    )
}
export default SignIn