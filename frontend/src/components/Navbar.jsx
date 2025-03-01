import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import ProfileModal from "./ProfileModal";

function Navbar() {


    return (
        <>
            <nav className="bg-blue-500 p-4 flex items-center">

                <ul className="flex space-x-4 ">
                    <li>
                        <Link to="/" className="text-white hover:text-gray-200">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-white hover:text-gray-200">About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="text-white hover:text-gray-200">Contact</Link>
                    </li>
                </ul>



            </nav>

            

        </>
    );
}

export default Navbar;