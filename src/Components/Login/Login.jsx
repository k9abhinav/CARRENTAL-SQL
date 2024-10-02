import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [isDisabled, setIsDisabled] = useState(true); // State to manage button disabled state
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/login', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/mybooking');
                } else {
                    alert(res.data.Error);
                }
            })
            .catch(err => console.error(err)); // Catch error instead of then

    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });

        // Enable/disable the button based on both email and password fields being non-empty
        setIsDisabled(values.email === '' || values.password === '');
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="w-[30vw] p-4 border rounded-lg bg-gray-100 ">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit} >
                    <div>
                        <label className="block mb-2">Email:</label>
                        <input
                            type="text"
                            name="email"
                            className="w-full p-2 border rounded"
                            onChange={handleInputChange}
                            value={values.email}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full p-2 border rounded"
                            onChange={handleInputChange}
                            value={values.password}
                            required
                        />
                    </div>
                    <button type="submit" className={`w-full p-2 mt-4 bg-blue-500 rounded text-white hover:bg-blue-700 ${isDisabled && 'cursor-not-allowed opacity-50'}`} disabled={isDisabled}>Login</button>
                </form>
                <p className="text-center mt-4">CREATE NEW ACCOUNT</p>
                <Link to="/register" className="block text-center mt-2 text-blue-500 hover:underline">Register</Link>
            </div>
        </div>
    );
}

export default Login;
