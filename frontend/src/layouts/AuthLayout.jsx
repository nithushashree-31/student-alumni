import React from 'react'
import logo from '../assets/busselton-logo.svg'
import pipe from '../assets/login-pipe.svg'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div className='min-h-screen bg-linear-to-r from-[#2D88D0] flex to-[#64BDF5]'>
            <div className="left p-18 w-[60%] min-h-screen relative">
                <img src={logo} alt="" className='p-1 bg-white rounded w-[8rem]' />
                <div className="text-section mt-4">
                    <h1 className='text-white text-[2rem] font-bold'>Committed to Enhancing Operational <br /> Efficiency in Building Water Management.</h1>
                    <p className='mt-4 text-white text-[1.5rem]'>Future-proofing buildings against backwater.</p>
                    <img src={pipe} alt="" className='absolute bottom-0 left-0 w-117' />
                </div>
            </div>
            <div className="right w-[40%] p-7 flex items-center justify-center">
                <div className="auth p-9 text-center relative bg-linear-to-r from-[#98D3F3] to-[#A5DDF9] w-[100%] h-full min-h-[500px] max-h-[720px] rounded-xl text-black overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AuthLayout