import React from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { MdEventAvailable, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiListSettingsLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from "next/router";


const Navbar = (props) => {
    const router = useRouter();
    
    return (
        <>
            {props.loading ? (  // Check if loading prop is true
               <div className='loader'> <span className="loader2"></span> </div>
            ) : (
                <nav className={props.expand ? 'm-navbar expand' : 'm-navbar unexpand'}>
                    <ul>
                        {/*  Event */}
                      
                        <li>
                            <Link href="">
                                <span className="icons"><MdEventAvailable /></span>
                                <span className="linklabel">Users</span>
                                <span className="submenuIcon"><MdOutlineKeyboardArrowDown /></span>
                            </Link>
                            <ul>
                                <li><Link href="/admin/addusers">Add Users</Link></li>
                                <li><Link href="/admin/registeredusers">List of Registered Users</Link></li>
                            </ul>
                        </li>

                        {/* Users */}
                     
                    </ul>
                </nav>
            )}
        </>
    );
}

export default Navbar;
