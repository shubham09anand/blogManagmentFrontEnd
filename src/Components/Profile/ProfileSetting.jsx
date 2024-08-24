import React, { useState } from 'react';
import CreateProfile from './CreateProfile';
import Password from './Password';

const ProfileSetting = () => {
    const [display, setDisplay] = useState(1);

    const handleTabClick = (tabIndex) => {
        setDisplay(tabIndex);
    };

    return (
        <div className="mx-4 min-h-screen sm:mx-8 xl:mx-auto lg:px-20 xl:px-40">
            <h1 className="md:border-b py-6 pb-3 md:pb-6 text-4xl font-semibold">Settings</h1>
            <div className="md:flex pt-3">
                <div className="md:w-1/5 px-5 md:border-r flex md:flex-col justify-between md:justify-normal">
                    <div onClick={() => handleTabClick(1)} className={`md:mt-5 cursor-pointer px-2 py-2 font-semibold transition ${ display === 1 ? 'border-l-2 border-l-blue-700 text-blue-700' : 'border-l-2 border-transparent' }`}>
                        Accounts
                    </div>
                    <div onClick={() => handleTabClick(2)} className={`md:mt-5 cursor-pointer px-2 py-2 font-semibold transition ${ display === 2 ? 'border-l-2 border-l-blue-700 text-blue-700' : 'border-l-2 border-transparent'}`}>
                        Password
                    </div>
                </div>
                <div className="md:w-4/5 px-5">
                    {display === 1 && <CreateProfile />}
                    {display === 2 && <Password />}
                </div>
            </div>
        </div>
    );
};

export default ProfileSetting;
