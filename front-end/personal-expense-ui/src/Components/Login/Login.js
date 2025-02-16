// import React from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/users/loginUser', { email: email, password: password })
        .then(res => {
            console.log(email,password)
            if(res.status === 200 || res.status === 201){
                console.log('user added successfully !')
                localStorage.setItem('email',email);
                navigate('/home');
            }else{
                console.log('something went wrong to add a user')
            }
        })
        .catch(error => console.log(`error = ${error}`))
    }

  return (
    <>
    <div className="form-wrapper flex justify-center items-center h-screen">
      <form className = 'login-form border h-100 w-100 flex flex-col justify-center items-center' onSubmit = {handleSubmit}>
        <div className="name-wrapper m-1">
          <label htmlFor="nameInput" className='text-base'>Email:</label>
          <input type="text" 
          onChange = { (e) => setEmail(e.target.value)} 
          className="nameInput border border-gray-200 p-1 m-2 rounded-md focus:outline-blue-200 text-sm" 
          placeholder="name" 
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
            if not register click on 
            <Link to='/register' className = 'underline'>sign-up</Link> 
        </span>
      </form>
    </div>    
    </>
  );
}

export default Login;
