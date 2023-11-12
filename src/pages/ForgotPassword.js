import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
    const auth = getAuth();

    const [email, setEmail] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        }

        setEmail("");
    };

    return (
        <div className='flex justify-center items-center bg-slate-300 h-screen'>
            <div className="bg-white h-96 space-y-12 w-[350px] flex flex-col justify-center items-center rounded-lg shadow-lg shadow-black/30">
                <h1 className='text-3xl font-bold text-center'>Forgot Password</h1>
                <form onSubmit={submitHandler}>
                    <div className='space-y-5'>
                        <p className="font-semibold">Email the with which you have registered</p>
                        <input
                            className="outline-none h-10 px-2 border rounded-sm w-full"
                            type="text"
                            placeholder="Email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="bg-blue-600 w-full h-10 rounded-lg text-white hover:bg-blue-500">Send Link</button>
                    </div>
                    <div className='pt-5'>
                        <p>Already have an account? <span className=' font-semibold'><Link to="/signin">LogIn</Link></span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;