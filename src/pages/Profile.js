import React from 'react';
import ContactDetails from '../components/ContactDetails';

const Profile = () => {
    return (
        <div>
            <div className='flex justify-between'>
                <div className='mx-4 mt-4'>
                    <h1 className='font-semibold text-2xl'>Winners never quit and quitters never win.</h1>
                </div>
                <div className='mx-4 mt-4'>
                    <p
                        className='bg-blue-50 py-1 px-2 rounded-lg'
                    >
                        Your profile is 64% completed. A complete profile
                        <br />
                        has a higher chance of landing a job. <span className='text-blue-800 cursor-pointer'> Complete now </span>
                    </p>
                </div>
            </div>
            <hr className=' border-black my-5' />

            <ContactDetails />
        </div>
    )
}

export default Profile;