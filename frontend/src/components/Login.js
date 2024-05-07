import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {

    const[credentials, setCredentials] = useState({email:"", password:""});
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        let result = await fetch("http://localhost:8000/api/create/login", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNDI0NWJlMjQ5ODlmNDVhM2M0ODdjIn0sImlhdCI6MTcwNjM2NjA2M30.MyE84UeJKXqgCZnQXnLRxjSeJVQMPDEgm14s0dik-dQ"
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        result = await result.json();
        console.log(result);
        if(result.success)
        {
            localStorage.setItem('token', result.authtoken);
            localStorage.setItem('role', result.role);
            props.handleAlert("Logged in successfully.", "success")
            navigate("/");
        }
        else{
            props.handleAlert(result.error, "danger");
        }
    };

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary"  >Submit</button>
            </form>

        </div>
    );
};

export default Login;