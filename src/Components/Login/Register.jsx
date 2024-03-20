import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        <div className='max-w-md mx-auto p-6 border rounded-lg bg-gray-100'>
            <h2 className='text-center text-2xl font-semibold text-blue-600 mb-6'>Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className='block mb-1 text-gray-600'>Fullname:</label>
                    <input
                        type='text'
                        name='fullname'
                        className='w-full p-2 border rounded'
                        onChange={e => { setValues({ ...values, fullname: e.target.value }) }}
                        required
                    />
                </div>
                <div>
                    <label className='block mb-1 text-gray-600'>Email:</label>
                    <input
                        type='text'
                        name='email'
                        className='w-full p-2 border rounded'
                        onChange={e => { setValues({ ...values, email: e.target.value }) }}
                        required
                    />
                </div>
                <div>
                    <label className='block mb-1 text-gray-600'>Phone:</label>
                    <input
                        type='text'
                        name='phone'
                        className='w-full p-2 border rounded'
                        onChange={e => { setValues({ ...values, phno: e.target.value }) }}
                        required
                    />
                </div>
                <div>
                    <label className='block mb-1 text-gray-600'>Password:</label>
                    <input
                        type='password'
                        name='password'
                        className='w-full p-2 border rounded'
                        onChange={e => { setValues({ ...values, password: e.target.value }) }}
                        required
                    />
                </div>
                <button type='submit' className='w-full p-3 bg-gradient-to-r from-sky-500 to-violet-500 rounded text-white hover:from-violet-500 hover:to-sky-500'>REGISTER</button>

            </form>
            <p className='text-center mt-4 text-gray-600'>Already have an account?</p>
            <Link to='/login' className='block text-center mt-2 text-blue-500 hover:underline'>LOGIN</Link>
        </div>
    )
}

export default Register;
