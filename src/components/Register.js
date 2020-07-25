import React, {useState} from 'react'
import {useGlobalState} from '../config/store'
import {registerUser} from '../services/authServices';

import '../styles/Register.css'

const Register = ({history}) => {
    const initialFormState = {
        username: "",
        email: "",
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
        registerUser(userDetails)
        .then(response => {
            dispatch({
                type: "setLoggedInUser",
                data: userDetails.username
            })
            history.push("/")
        })
        .catch(error => {
            setErrorMessage("Oops something went wrong, try another email");
        });
        
    }

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <p className={{color: 'red'}}>{errorMessage}</p>}
            <div className="divStyles">
                <label className="labelStyles">Username</label>
                <input className="labelStyles" required type="text" name="username" placeholder="Enter a username" onChange={handleChange}></input>
            </div>
            <div className="divStyles">
                <label className="labelStyles">Email</label>
                <input className="labelStyles" required type="email" name="email" placeholder="Enter an email" onChange={handleChange}></input>
            </div>
            <div className="divStyles">
                <label className="labelStyles">Password</label>
                <input className="labelStyles" required type="password" name="password" placeholder="Enter a password" onChange={handleChange}></input>
            </div>
            <input type="submit" value="Register"></input>
            
        </form>
    )
}
export default Register