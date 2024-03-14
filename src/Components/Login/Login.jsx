import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/login', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/dash');
                } else {
                    alert(res.data.Error);
                }
            })
            .then(err => console.log(err))
    }

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg bg-gray-100">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-2">Email:</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        onChange={e => setValues({ ...values, email: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Password:</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        onChange={e => setValues({ ...values, password: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="w-full p-2 mt-4 bg-blue-500 rounded text-white hover:bg-blue-700">Login</button>
            </form>
            <p className="text-center mt-4">CREATE NEW ACCOUNT</p>
            <Link to="/register" className="block text-center mt-2 text-blue-500 hover:underline">Register</Link>
        </div>
    );
}

export default Login;
