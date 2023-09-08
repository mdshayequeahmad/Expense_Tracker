import React, { useState } from 'react';
import { getAuth, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from "../redux/expenseSlice";
import { FaUserTie } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const ContactDetails = () => {
    const [fullname, setFullname] = useState("");
    const [url, setUrl] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();

    const submitHandler = (e) => {
        e.preventDefault();

        updateProfile(auth.currentUser, {
            displayName: fullname,
            photoURL: url
        }).then(() => {
            dispatch(addUser({
                displayName: fullname,
                photoURL: url
            })
            );
            navigate("/");
            console.log("Profile updated!");
        }).catch((error) => {
            console.log(error);
        });

        setFullname("");
        setUrl("");
    };

    return (
        <div>
            <div className='flex'>
                <div className='w-1/4 my-3'>
                </div>
                <div className='flex justify-between w-3/4 my-3 mx-5'>
                    <h1 className='font-semibold text-2xl'>Contact Details</h1>
                    <button
                        className='text-red-600 border-solid border-2 border-red-600 rounded-lg px-3 
                 hover:bg-red-600 hover:text-white'
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <div className='flex'>
                <div className='w-1/4'>
                </div>
                <div className='w-3/4 my-3 mx-5'>
                    <form onSubmit={submitHandler}>
                        <div className='flex flex-row items-center space-x-2'>
                            <div className='flex flex-row items-center space-x-2 mr-40'>
                                <FaUserTie className='' />
                                <label>Full Name: </label>
                                <input
                                    className='outline-none h-8 px-2 border rounded-sm border-slate-900'
                                    type="text"
                                    value={fullname}
                                    required
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                            </div>
                            <AiOutlineGlobal />
                            <label>Profile Photo URL: </label>
                            <input
                                className='outline-none h-8 px-2 border rounded-sm border-slate-900'
                                type="url"
                                value={url}
                                required
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <br />
                        </div>
                        <button
                            type='submit'
                            className='bg-blue-500 px-4 py-1 rounded-lg hover:bg-blue-400 my-4'
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactDetails;