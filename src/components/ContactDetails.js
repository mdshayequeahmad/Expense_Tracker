import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/expenseSlice";
import { FaUserTie } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ContactDetails = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const [fullname, setFullname] = useState("");
    const [url, setUrl] = useState("");

    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.expenses.userInfo);
    const navigate = useNavigate();

    const { displayName, photoURL } = user;

    useEffect(() => {
        setFullname(displayName);
        setUrl(photoURL);
    }, [displayName, photoURL]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await updateProfile(auth.currentUser, {
                displayName: fullname,
                photoURL: url,
            });
            dispatch(
                addUser({
                    ...userInfo,
                    ...{
                        displayName: fullname,
                        photoURL: url,
                    },
                }),
            );
            navigate(-1);
            console.log("Profile updated!");
        } catch (error) {
            console.log(error);
        }

        setFullname("");
        setUrl("");
    };

    return (
        <div>
            <div className="flex">
                <div className="w-1/4 my-3"></div>
                <div className="flex justify-between w-3/4 my-3 mr-5">
                    <h1 className="font-semibold text-2xl">Contact Details</h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-red-600 border-solid border-2 border-red-600 rounded-lg px-3 
                 hover:bg-red-600 hover:text-white"
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <div className="flex">
                <div className="w-1/4"></div>
                <div className="w-3/4 my-3">
                    <form onSubmit={submitHandler}>
                        <div className="flex flex-row items-center space-x-2">
                            <div className="flex flex-row items-center space-x-2 mr-40">
                                <FaUserTie className="" />
                                <label>Full Name: </label>
                                <input
                                    className="outline-none h-8 px-2 border rounded-sm border-slate-900"
                                    type="text"
                                    value={fullname}
                                    required
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                            </div>
                            <AiOutlineGlobal />
                            <label>Profile Photo URL: </label>
                            <input
                                className="outline-none h-8 px-2 border rounded-sm border-slate-900"
                                type="url"
                                value={url}
                                required
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <br />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 px-4 py-1 rounded-lg hover:bg-blue-400 my-4"
                        >
                            Update
                        </button>
                    </form>
                    <hr className=" border-black my-5" />
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;