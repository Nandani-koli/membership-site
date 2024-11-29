'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import Link from "next/link";
const VerifyMail = () => {

    const searchParams = useSearchParams();
    let token = searchParams.get('token');
    
    const [Verified ,setverified] = useState(false)
    const [error,seterror] = useState('');

   useEffect(() => {
    (async() => {
        let res = await fetch(`/api/verifymail`,{
            method : 'POST',
            body : JSON.stringify({token}) ,
        });

        let result = await res.json();

        if(result.status == 200)
        {
            setverified(true);
            return;
        }
        else if(result.status == 498)
        {
            seterror(result.message);
            return;
        } 
        else{
            seterror(result.message);
        }

    })();
   })

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div>
        <h1>EMAIL VERIFICATION</h1><br /> 
        {Verified ? (<>
            <h4 className="m-5 text-success">Email Verified Successfully</h4><br/>
            <Link className="m-5" href = {'/member/login'}>Login</Link>
        </>) : <h4 className="text-danger m-5">{error}</h4>}
        </div>
    </div>
  )
}

export default VerifyMail