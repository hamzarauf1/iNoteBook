import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentianls, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentianls.email, password: credentianls.password })

        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged in successfully", "success")
            navigate("/");

        }
        else {
            props.showAlert("Invalid credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentianls, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <h1>Login to iNotebook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentianls.email} onChange={onChange} name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentianls.password} onChange={onChange} name='password' />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
