'use client'
import { useState,useEffect } from 'react';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

async function userDetail(id) {
    try {
        let res = await fetch(`/api/userdetail/?id=${id}`);
        let result = await res.json();

        if (result.status == 200) {
            return result.data;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error("error loading user ", error);
    }
}
const UserNav = () => {

    const [IsVerified, setisVerified] = useState(true);
    const [curUser, setcurUser] = useState([]);

    useEffect(() => {
        (async () => {
            const token = Cookies.get('token');
            const tokendata = jwtDecode(token);
            const user = await userDetail(tokendata.id);
            setcurUser(user);
            if (user.IsVerified == false) {
                setisVerified(false);
            }
        })();
    }, []);

  return (
    <nav className="navbar navbar-expand-lg pt-3 pb-3 ps-4 pe-4" style={{ backgroundColor: '#e3f2fd' }}>
                <div className="container-fluid">
                    <div><Link href={"/member"} className="navbar-brand" >Welcome {curUser.name}</Link></div>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        style={{ backgroundColor: "#fff" }}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav text-center  ms-auto mb-2 mb-lg-0">
                            {IsVerified && curUser.subscriptionlevel == 3 ?
                                <>
                                    <li className="nav-item btn btn-outline-success m-2">
                                        <Link href={'/member/users/documents'} className="nav-link ">Upload Documents</Link> </li>
                                    <li className="nav-item btn btn-outline-success m-2">
                                        <Link href={`/member/users/media`} className="nav-link ">Media Section</Link>
                                    </li>
                                    <li className="nav-item btn btn-outline-success m-2">
                                        <Link href={`/member/edituser/${curUser.id}`} className="nav-link ">Update Profile</Link>
                                    </li>
                                </> : null}

                            {IsVerified && curUser.subscriptionlevel == 2 ?
                                <> <li className="nav-item btn btn-outline-success m-2">
                                    <Link href={'/member/users/documents'} className="nav-link ">Upload Documents</Link> </li>
                                    <li className="nav-item btn btn-outline-success m-2">
                                        <Link href={`/member/edituser/${curUser.id}`} className="nav-link ">Update Profile</Link>
                                    </li>
                                </>
                                : null}

                            {IsVerified && curUser.subscriptionlevel == 1 ?
                                <li className="nav-item btn btn-outline-success m-2">
                                    <Link href={`/member/edituser/${curUser.id}`} className="nav-link ">Update Profile</Link>
                                </li>
                                : null}


                            <li className="nav-item btn btn-outline-success m-2">
                                <Link href={`/member/users/myOrders`} className="nav-link ">Order History</Link>
                            </li>


                            <LogoutButton />
                        </ul>
                    </div>
                </div>
            </nav>
  )
}

export default UserNav