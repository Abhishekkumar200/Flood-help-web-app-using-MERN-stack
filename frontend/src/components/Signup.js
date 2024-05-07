import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Signup = (props)=>{
    const[credentials, setCredentials] = useState({name:"",email:"", password:"", role:""});
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        let result = await fetch("http://localhost:8000/api/create/register", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNDI0NWJlMjQ5ODlmNDVhM2M0ODdjIn0sImlhdCI6MTcwNjM2NjA2M30.MyE84UeJKXqgCZnQXnLRxjSeJVQMPDEgm14s0dik-dQ"
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password,  role: credentials.role})
        });
        result = await result.json();
        console.log(result);
        if(result.success)
        {
            localStorage.setItem('token', result.authtoken);
            localStorage.setItem('role', result.role);
            navigate("/");
            props.handleAlert("Account created successfully.", "success");
        }
        else{
            props.handleAlert(result.error, "danger");
        }
        
    };

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };
    
    return(
        <div className='container'>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Full name</label>
            <input type="text" className="form-control" id="name" name = "name" onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
            <select className="form-select" id="role" name="role" aria-label="Default select example" onChange={onChange}>
                <option selected>Select from the menu</option>
                <option value="user">User</option>
                <option value="panchayat">Panchayat</option>
                <option value="DDMA">DDMA</option>
            </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    );
};

export default Signup;