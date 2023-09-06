import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/expenseSlice';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("User has successfully signed up.");
                const user = userCredential.user;
                dispatch(addUser({
                    _id: user.uid,
                    email: user.email,
                })
                );
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                console.log(errorMessage);
            });

        setEmail("");
        setPassword("");

    };

    return (
        <div className='bg-slate-300 h-screen flex justify-center items-center'>
            <div className='bg-white h-96 space-y-3 w-[350px] flex flex-col justify-center items-center rounded-lg shadow-lg shadow-black/30'>
                <form onSubmit={submitHandler} className='space-y-4'>
                    <div className='flex justify-center'>
                        <h1 className='font-bold text-3xl'>SIGN UP</h1>
                    </div>
                    <div>
                        <p className='font-semibold'>Email</p>
                        <input
                            className='outline-none h-10 px-2 border rounded-sm w-full'
                            type="text"
                            placeholder='Email'
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='font-semibold'>Password</p>
                        <input
                            className='outline-none h-10 px-2 border rounded-sm w-full'
                            type="password"
                            placeholder='Password'
                            minLength="6"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='pt-4'>
                        <button className='bg-blue-600 w-full h-10 rounded-lg text-white hover:bg-blue-500'>SIGN UP</button>
                    </div>
                    <div className='pt-3'>
                        <p>Already have an account? <span className=' font-semibold'><Link to="/signin">SignIn</Link></span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;