'use client'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Loading from "../loading";

const Login = () => {

    const router = useRouter();

    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [responseMsg, setresponseMsg] = useState('');
    const [isForgot, setIsForgot] = useState(false);
    const [forgeterror, setforgeterror] = useState();
    const [isloading, setisloading] = useState(false);


    const forgot = () => {
        setIsForgot(true);
    }

    const forgotPassword = async (e) => {
        e.preventDefault();

        if (!email) {
            setforgeterror('Email is required');  
        } else if (!isValidEmail(email)) {
            setforgeterror('Invalid email format');
        }
        else {
            setisloading(true);
            try {
                setforgeterror('');

                let res = await fetch(`/api/resetpassword?email=${email}`);
                let result = await res.json();
                setresponseMsg(result.message)
                setisloading(false)

            } catch (error) {
                throw new Error(error.message);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validateErr = {};

        if (!email) {
            validateErr.email = 'Email is required';
        } else if (!isValidEmail(email)) {
            validateErr.email = 'Invalid email format';
        }

        if (!password) {
            validateErr.password = 'Password is required';
        }

        if (Object.keys(validateErr).length > 0) {
            setErrors(validateErr);
        } else {
            setErrors({});

            try {
                const res = await fetch('/api/login', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                });
                let responsedata = await res.json();

                if (responsedata.status == 200) {

                    Cookies.set('token', responsedata.data.accessToken)
                    setresponseMsg(responsedata.message);

                    setTimeout(() => {
                        setresponseMsg('')
                        if (responsedata.data.userInfo.role == 0) {
                            router.push('/member/users');
                        } else {
                            router.push('/member/admin')
                        }
                    }, 1000);
                }
                else {
                    setresponseMsg(responsedata.message);
                    setTimeout(() => {
                        setresponseMsg('')
                    }, 2000);
                }
            } catch (error) {
                throw new Error(error.message);
            }
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };


    return (
        <section className="vh-100 gradient-custom" style={{ backgroundColor: '#e3f2fd' }}>
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration">
                            <div className="card-body p-4 p-md-5">

                                {isForgot ? (<>
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Reset your password</h3>

                                    {isloading ? <Loading /> :  <h4 className="text-success text-center">{responseMsg}</h4>}
                                    <form onSubmit={forgotPassword}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label"  >Email</label>
                                                    <input type="email" id="emailAddress" className="form-control form-control-lg"
                                                        name="email" value={email} placeholder="Enter Email"
                                                        onChange={(e) => setMail(e.target.value)} />
                                                    {forgeterror && <span className="text-danger">{forgeterror}</span>}
                                                </div>

                                            </div>

                                        </div>
                                        
                                                <div className="mt-4 pt-2">
                                                    <input id = "btnSubmit" className="btn btn-primary btn-lg" type="submit" value="Reset" />
                                                </div>
                                        
                                    </form></>) : (<>
                                        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Login Form</h3>

                                        {responseMsg && <h4 className="text-success text-center">{responseMsg}</h4>}
                                        <form onSubmit={handleSubmit}>

                                            <div className="row">
                                                <div className="col-md-6 mb-4 pb-2">

                                                    <div className="form-outline">
                                                        <label className="form-label"  >Email</label>
                                                        <input type="email" id="emailAddress" className="form-control form-control-lg"
                                                            name="email" value={email} placeholder="Enter Email"
                                                            onChange={(e) => setMail(e.target.value)} />
                                                        {errors.email && <span className="text-danger">{errors.email}</span>}
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="row">


                                                <div className="col-md-6 mb-4 pb-2">

                                                    <div className="form-outline">
                                                        <label className="form-label" >Password</label>
                                                        <input type="password" id="lastName" className="form-control form-control-lg" name="password"
                                                            placeholder="Enter Password"
                                                            value={password} onChange={(e) => setPassword(e.target.value)} />
                                                        {errors.password && <span className="text-danger">{errors.password}</span>}
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="mt-4 pt-2">
                                                <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                                            </div>

                                        </form>
                                        <Link href="/member/register">New user ? Signup</Link><br /><br />
                                        <button onClick={forgot}>Forgot Password ? Reset here</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login

