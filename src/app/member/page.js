'use client'
import Link from 'next/link'
import { Bangers } from 'next/font/google'
import Footer from './components/Footer'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import Pricing from './components/Pricing'
const bangers = Bangers({ subsets: ['latin'], weight: '400', })


export default function Member() {

  const [isloggedin, setisloggedin] = useState(false);
  const [role,setrole] = useState(0);
  const [level, setlevel] = useState(0);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setisloggedin(true);
      const tokendata = jwtDecode(token);
      setrole(tokendata.role);
      setlevel(tokendata.subscriptionlevel);
    }
  }, [])

  return (
    <>

      {/* Navbar content  */}
      <nav className="navbar navbar-expand-lg pt-3 pb-3 ps-4 pe-4" style={{ backgroundColor: '#e3f2fd' }}>
        <div className="container-fluid">
          <div className={bangers.className}><Link href={"/"} className="navbar-brand" >Nandani Koli</Link></div>

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

          {isloggedin ? <ul className="navbar-nav text-center  ms-auto mb-2 mb-lg-0">
            <li className="nav-item btn btn-outline-success m-2">
              <Link href={role == 1 ? "/member/admin" : "member/users"} className="nav-link ">Dashboard</Link>
            </li> </ul> 
            : 
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav text-center  ms-auto mb-2 mb-lg-0">

              <li className="nav-item btn btn-outline-success m-2">
                <Link href="/member/login" className="nav-link ">Login</Link>
              </li>
              <li className="nav-item btn btn-outline-primary m-2">
                <Link href="/member/register" className="nav-link ">Register</Link>
              </li>
            </ul>
          </div>}
        </div>
      </nav>

      {/* home section content  */}
      <div className='text-center m-5'>
        <h1>Welcome to my membership site</h1>
      </div>

      {isloggedin && role == 0 ? <Pricing level = {level}/> : <Pricing level = {0}/>}
      
      {/* footer  */}
      <Footer />

    </>
  )
}
