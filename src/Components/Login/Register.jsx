import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Register() {
    const [values, setValues] = useState({
        fullname: '',
        email: '',
        password: '',
        phno: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/register', values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate('/login');
                } else {
                    alert("There was an error in registration.");
                }
            })
            .catch(err => console.error(err))
    }

    return (
        <div className='max-w-md mx-auto p-4 border rounded-lg bg-gray-100'>
            <h2 className='text-center'>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='block mb-2'>Fullname:</label>
                    <input
                        type='text'
                        className='w-full p-2 border rounded'
                        onChange={e => { setValues({ ...values, fullname: e.target.value }) }}
                        required
                    />
                </div>
                <div>
                    <label className='block mb-2'>Email:</label>
                    <input
                        type='text'
                        className='w-full p-2 border rounded'
                        onChange={e => { setValues({ ...values, email: e.target.value }) }}
                        required
                    />
                </div>
                <div>
                    <label className='block mb-2'>Phone:</label>
                    <input
                        type='text'
                        className='w-full p-2 border rounded'
                        onChange={e => { setValues({ ...values, phno: e.target.value }) }}
                        required
                    />
                </div>
                <div>
                    <label className='block mb-2'>Password:</label>
                    <input
                        type='password'
                        className='w-full p-2 border rounded'
                        onChange={e => { setValues({ ...values, password: e.target.value }) }}
                        required
                    />
                </div>
                <button type='submit' className='w-full p-2 mt-4 bg-blue-500 rounded text-white hover:bg-blue-700'>REGISTER</button>
            </form>
            <p className='text-center mt-4'>ALREADY HAVE AN ACCOUNT</p>
            <Link to='/login' className='block text-center mt-2 text-blue-500 hover:underline'>LOGIN</Link>
        </div>
    )
}

export default Register
