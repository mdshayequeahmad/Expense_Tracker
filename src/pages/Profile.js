import React from 'react';
import { getAuth, sendEmailVerification } from "firebase/auth";
import ContactDetails from '../components/ContactDetails';

const Profile = () => {

    const auth = getAuth();

    const verifyEmailHandler = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("Email verification sent!");
            });
    };

    return (
        <div>
            <div className='flex justify-between'>
                <div className='mx-4 mt-4'>
                    <h1 className='font-semibold text-2xl'>Winners never quit and quitters never win.</h1>
                </div>
                <div className='flex mx-4 mt-4'>
                    <p
                        className='bg-blue-50 py-1 px-2 rounded-lg'
                    >
                        Your profile is 64% completed. A complete profile
                        <br />
                        has a higher chance of landing a job. <span className='text-blue-800 cursor-pointer'> Complete now </span>
                    </p>
                    <button
                        onClick={verifyEmailHandler}
                        className='bg-sky-300 my-3 ml-4 px-3 py-2 rounded-lg hover:bg-sky-200'
                    >
                        Verify Email
                    </button>
                </div>
            </div>
            <hr className=' border-black my-5' />

            <ContactDetails />
        </div>
    )
}

export default Profile;