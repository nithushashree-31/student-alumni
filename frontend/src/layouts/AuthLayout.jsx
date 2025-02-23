import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className='min-h-screen bg-linear-to-r from-[#2D88D0] to-[#64BDF5] flex'>
            <div className="left p-18 w-[60%] min-h-screen relative">
                <div className="text-section mt-4">
                    <h1 className='text-white text-[2rem] font-bold'>Connecting the World, One Post at a Time</h1>
                    <p className='mt-4 text-white text-[1.5rem]'>Discover. Connect. Engage.</p>
                    {/* <img src={pipe} alt="Decorative Design" className='absolute bottom-0 left-0 w-117' /> */}
                </div>
            </div>
            <div className="right w-[40%] p-7 flex items-center justify-center">
                <div className="auth p-9 text-center relative bg-linear-to-r from-[#98D3F3] to-[#A5DDF9] w-[100%] h-full min-h-[500px] max-h-[720px] rounded-xl text-black overflow-y-auto">
                    <Outlet /> {/* This retains the ability to nest routes within your auth layout */}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout;
