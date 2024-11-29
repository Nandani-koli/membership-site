'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Loading from "../loading";
const Adduserform = (props) => {

    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [errors, setErrors] = useState({});
    const [responseMsg, setresponseMsg] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validateErr = {};

        if (!name) {
            validateErr.name = 'Name is required';
        } else if (!isValidName(name)) {
            validateErr.name = 'Name should only contain letters';
        }

        if (!email) {
            validateErr.email = 'Email is required';
        } else if (!isValidEmail(email)) {
            validateErr.email = 'Invalid email format';
        }

        if (!password) {
            validateErr.password = 'Password is required';
        }

        if (!confirmpassword) {
            validateErr.confirmpassword = 'Confirm password is required';
        } else if (password != confirmpassword) {
            validateErr.confirmpassword = 'Password did not match';
        }

        if (!phone) {
            validateErr.phone = 'Phone number is required';
        } else if (!isValidNumber(phone)) {
            validateErr.phone = 'Phone number should contain 10 digit number';
        }


        if (Object.keys(validateErr).length > 0) {
            setErrors(validateErr);
        } else {
            setErrors({});
            setIsLoading(true);
            try {
                const res = await fetch('/api/register', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        password: password,
                        email: email,
                        phone: phone
                    }),
                });
                let responsedata = await res.json();
                
                setIsLoading(false);
                
                if (responsedata.status == 200) {
                    setresponseMsg(responsedata.message);

                    let token = Cookies.get('token');

                    setTimeout(() => {
                        setresponseMsg('')
                        if (token) {
                            router.push('/member/admin')
                        } else {
                            router.push('/member/login')
                        }
                    }, 3000);

                }
                else {
                    setresponseMsg(responsedata.message);               
                }

            } catch (error) {
                throw new Error(error);
            }
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const isValidNumber = (phone) => {
        const phonereg = /^[0-9]{10}$/;
        return phonereg.test(phone);
    }

    const isValidName = (name) => {
        const namereg = /^[A-Za-z\s]+$/;
        return namereg.test(name);
    }


    return (

        <>
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">{props.title}</h3>
            {responseMsg && <h4 className="text-success text-center">{responseMsg}</h4>}
            {isLoading && <Loading />}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-4">

                        <div className="form-outline">
                            <label className="form-label">Name</label>
                            <input type="text" id="Name" className="form-control form-control-lg" name="name" value={name}
                                onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
                            {errors.name && <span className="text-danger">{errors.name}</span>}
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-4 pb-2">

                        <div className="form-outline">
                            <label className="form-label"  >Email</label>
                            <input type="email" id="emailAddress" className="form-control form-control-lg" name="email" value={email}
                                placeholder="Enter Email"
                                onChange={(e) => setMail(e.target.value)} />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>

                    </div>
                    <div className="col-md-6 mb-4 pb-2">

                        <div className="form-outline">
                            <label className="form-label"  >Phone Number</label>
                            <input type="tel" id="phoneNumber" className="form-control form-control-lg" name="phone" value={phone}
                                placeholder="Enter Phone Number"
                                onChange={(e) => setPhone(e.target.value)} />
                            {errors.phone && <span className="text-danger">{errors.phone}</span>}
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-4">

                        <div className="form-outline">
                            <label className="form-label" >Password</label>
                            <input type="password" className="form-control form-control-lg" name="password" placeholder="Enter Password"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                            {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>

                    </div>

                    <div className="col-md-6 mb-4">

                        <div className="form-outline">
                            <label className="form-label" >Confirm Password</label>
                            <input type="password" className="form-control form-control-lg" name="password" placeholder="Enter Password"
                                value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} />
                            {errors.confirmpassword && <span className="text-danger">{errors.confirmpassword}</span>}
                        </div>

                    </div>
                </div>
                {isLoading ?  <div className="mt-4 pt-2">
                    <input className="btn btn-primary btn-lg" type="submit" value="Submit" disabled/>
                </div> :
                <div className="mt-4 pt-2">
                    <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                </div>}

            </form>

        </>

    )
}

export default Adduserform