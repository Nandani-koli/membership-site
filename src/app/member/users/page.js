'use client'
import Link from "next/link"
import LogoutButton from "../components/LogoutButton";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Image from "next/image";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Loading from "../loading";

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

const User = () => {

    const [curUser, setcurUser] = useState([]);
    const [documents, setdocuments] = useState([]);
    const [resmsg, setresmsg] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [IsVerified, setisVerified] = useState(true);


    useEffect(() => {
        (async () => {
            const token = Cookies.get('token');
            const tokendata = jwtDecode(token);
            const user = await userDetail(tokendata.id);
            setcurUser(user);
            if (user.documents) {
                setdocuments(user.documents);
            }
            if (user.IsVerified == false) {
                setisVerified(false);
            }
        })();
    }, [isLoading]);

    async function verifyEmail() {

        setIsLoading(true);
        try {
            let res = await fetch('/api/verifymail')
            let result = await res.json();
            setresmsg(result.message);
            setIsLoading(false)

        } catch (error) {
            throw new Error(error.message);
        }
    }
    return (
        <>
            {IsVerified ? null : (<div>
                {resmsg == "" ?
                    (<div className="alert alert-warning text-center">First verify you email address, to explore more options
                        <button onClick={verifyEmail}>Verify</button></div>) : (<div>{isLoading ? (<div class="spinner-border text-success" role="status">
                            <span class="sr-only"></span>
                        </div>) :
                            (<div className="alert alert-success text-center">{resmsg}</div>)}</div>)
                }
            </div>)}

            {/* user details */}
            <div className="container justify-content-center m-5">
                <div className="card ">
                    <div className="row no-gutters">
                        <div className="col-sm-5">
                            <div className="card-img">
                                {(curUser.image) ?
                                    <Image
                                        src={curUser.image}
                                        alt="userimage"
                                        width={500} height={500}
                                    /> :
                                    <Image
                                        src='/images/default.png'
                                        alt="userimage"
                                        width={500} height={500}
                                    />
                                }

                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="card-body">
                                <h5 className="card-title">Hello !...{curUser.name}</h5>
                                <p className="card-text">Email :- {curUser.email} </p>
                                <p className="card-text">Phone No. :- {curUser.phone} </p>
                            </div>
                            {curUser.IsVerified && (curUser.subscriptionlevel == 2 || curUser.subscriptionlevel == 3) ?
                                <div>
                                    <h4 className="text-center m-3">Uploaded Documents</h4>
                                    {(documents.length > 0) ?
                                        documents.map((file, i) => (
                                            <ul key={i}>
                                                <li><Link href={file} target="_blank">{`Document - ${i + 1}`}</Link></li>
                                            </ul>
                                        ))
                                        :
                                        <Link href={'/member/users/documents'}>Please upload documents here...</Link>
                                    }
                                </div> : null}
                        </div>
                    </div>
                </div>
            </div>

            <div>

            </div>

            {/* footer */}
            <Footer />

        </>
    )
}

export default User