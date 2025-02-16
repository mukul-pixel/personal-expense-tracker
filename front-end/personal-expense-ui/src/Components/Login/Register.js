import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {

    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/users/registerUser', {name:name,email:email,password:password})
        .then(res => {
            if(res.status === 200 || res.status === 201){
                console.log("user added successfully")
                navigate('/home')
            }else{
                console.log("something went wrong")
            }
        })
        .catch(error => console.log(`something went wrong - ${error}`))
    }

    return ( 
        <>
        <div className="form-wrapper flex justify-center items-center h-screen">
            <form className = 'login-form border h-100 w-100 flex flex-col justify-center items-center' onSubmit = {handleSubmit}>
            <div className="name-wrapper m-1">
                <label htmlFor="nameInput" className='text-base'>Name:</label>
                <input type="text" 
                onChange = { (e) => setName(e.target.value)} 
                className="nameInput border border-gray-200 p-1 m-2 rounded-md focus:outline-blue-200 text-sm" 
                placeholder="name" 
                required
                />
            </div>
            <div className="email-wrapper m-1">
                <label htmlFor="emailInput" className='text-base'>Email:</label>
                <input type="text" 
                onChange = { (e) => setEmail(e.target.value)} 
                className="emailInput border border-gray-200 p-1 m-2 rounded-md focus:outline-blue-200 text-sm" 
                placeholder="email" 
                required
                />
            </div>
            <div className="password-wrapper m-1">
                <label htmlFor="passwordInput">Password:</label>
                <input type="password"  
                onChange = { (e) => setPassword(e.target.value)} 
                className="passwordInput border border-gray-200 p-1 m-2 rounded-md focus:outline-blue-200 text-sm" 
                placeholder="password" 
                required
                />
            </div>
            <button className = 'submitBtn border bg-blue-300 w-2/3 p-1 rounded-md' >Submit</button>
            <span className = 'text-xs p-1'>
                if already a user, click on 
                <Link to='/' className = 'underline'>sign-in</Link> 
            </span>
            </form>
        </div>
        </>
     );
}

export default Register;