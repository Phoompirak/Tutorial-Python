"use client"

import React, { useState } from 'react'
import Image from 'next/image'

import { FaHamburger } from "react-icons/fa";

import Sidebar from "./Sidebar";

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    return (
        <div>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            {/* Glow Header */}
            <header className="flex justify-between items-center mb-10 p-5 shadow-xl bg-gray-900/60 backdrop-blur-md border border-gray-700/40">
                {/* Close Button */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-xl text-gray-300 hover:text-white focus:outline-none"
                    >
                        <FaHamburger />
                    </button>
                </div>
                {/* <h1 className="hidden md:block text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text drop-shadow-lg">
                    🐍 Python Live Sandbox
                </h1> */}
                <div className="text-gray-400 text-sm font-mono">
                    <div className='flex flex-row items-center justify-start md:justify-end gap-2'>
                        <Image
                            src="/default_image.jpg"
                            width={24}
                            height={24}
                            className='rounded-full'
                            alt="Picture of the author"
                        />
                        <h1 className="text-indigo-400 text-lg">User Name</h1>
                    </div>
                    <div className='flex gap-4'>
                        <h3>Score: 10</h3>
                        <span>Level: 1</span>
                    </div>

                </div>
            </header>
        </div>
    )
}

export default Navbar
