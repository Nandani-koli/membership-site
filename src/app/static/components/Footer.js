'use client'
import Link from 'next/link';
import { useState } from 'react';
const Footer = () => {

  const [email, setMail] = useState('');
  const [errors, setErrors] = useState({});


  const handlesubmit = (e) => {
    e.preventDefault();

    const validateErr = {};

    if (!email) {
      validateErr.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      validateErr.email = 'Invalid email format';
    }

    if (Object.keys(validateErr).length > 0) {
      setErrors(validateErr);
    } else {
      alert('Subscribed successfully');
      setErrors({});
    }
  }

  const isValidEmail = (email) => {
    const emailreg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return emailreg.test(email);
  };




  return (
    <>

      <footer className="bg-dark text-center text-white p-5 mt-5">

        <div className="container p-4">

          <section className="">
            <form action="" onSubmit={handlesubmit}>

              <div className="row d-flex justify-content-center">

                <div className="col-auto">
                  <p className="pt-2">
                    <strong>Sign up for newsletter</strong>
                  </p>
                </div>

                <div className="col-md-5 col-12">

                  <div className="form-outline form-white mb-4">
                    <input type="email" placeholder='Enter Email Address' className="form-control" value={email} onChange={(e) => { setMail(e.target.value) }} />
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                  </div>
                  
                </div>

                <div className="col-auto">

                  <button type="submit" className="btn btn-outline-light mb-4">
                    Subscribe
                  </button>
                </div>

              </div>

            </form>
          </section>

          <section >


            <div>
              <h5 className="text-uppercase">Social Handles</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link href="https://github.com/Nandani-koli/" className="text-white">Github</Link>
                </li>
                <li>
                  <Link href="https://in.linkedin.com/in/nandani-koli-43197420b" className="text-white">Linked In</Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/" className="text-white">Instagram</Link>
                </li>
              </ul>
            </div>

            
            <div className='m-3'>
              <h5 className="text-uppercase">Membership</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link href={'../../member'} className="text-white">Go to my membership site</Link>
                </li>
              </ul>
            </div>

          </section>

        </div>

        <div className="text-center p-3" >
          © 2020 Copyright:
          <p className="text-white" >Created By Nandani</p>
        </div>

      </footer>

    </>
  )
}

export default Footer