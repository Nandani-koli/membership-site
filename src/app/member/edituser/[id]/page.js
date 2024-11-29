'use client'
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profilepicture from "../../components/Profilepicture";
import Link from "next/link";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Loading from "../../loading";

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
        throw new Error(error);
    }
}

const Edit = () => {

    const router = useRouter();
    const path = usePathname();
    const id = path.split('edituser/')[1];  

    const [name, setName] = useState('');
    const [email, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setrole] = useState('');
    const [errors, setErrors] = useState({});
    const [responseMsg,setresponseMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {

            const token = Cookies.get('token');
            const tokeninfo = jwtDecode(token);
 
            if (tokeninfo.role == 1 || tokeninfo.id === id) {
                const user = await userDetail(id);
                if (!user) {
                    setresponseMsg('Invalid User Id');
                    setTimeout(() => {
                        setresponseMsg('');
                    }, 1000)
                    return;
                }
                setName(user.name);
                setMail(user.email);
                setPhone(user.phone);
                setrole(tokeninfo.role);
            }
            else {
                router.push('/member/users')
            }
        })();

    }, []);


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
        if (!phone) {
            validateErr.phone = 'Phone number is required';
        } else if (!isValidNumber(phone)) {
            validateErr.phone = 'Phone number should contain 10 digit number';
        }

        if (Object.keys(validateErr).length > 0) {
            setErrors(validateErr);
        } else {
            setErrors({});

            const formData = {}

            formData.name =name
            formData.email = email
            formData.phone = phone
            if (password) {
                formData.password = password
            }

            //calling update api to update user data 
            setIsLoading(true);

            try {
                const res = await fetch(`/api/update/?id=${id}`, {
                    method: "PUT",
                    body: JSON.stringify(formData),
                });
                let responsedata = await res.json();

                setIsLoading(false);
                if (responsedata.status == 200) {
                    setresponseMsg(responsedata.message);
                    setTimeout(() => {
                        setName(''), setMail(''), setPhone(''),setresponseMsg('');
                    }, 2000)
                }
                else {
                    throw new Error("Failed to update user");
                }
            } catch (error) {
                throw error;
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
        <section className="vh-100 gradient-custom" style={{ backgroundColor: '#e3f2fd' }}>
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration">
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Update User</h3>
                                {responseMsg && <h4 className="text-success text-center">{responseMsg}</h4>}
                                {isLoading && <Loading />}
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <label className="form-label">First Name</label>
                                                <input type="text" id="firstName" placeholder="Enter First Name" className="form-control form-control-lg" name="name" value={name}
                                                    onChange={(e) => setName(e.target.value)} />
                                                {errors.name && <span className="text-danger">{errors.name}</span>}
                                            </div>

                                        </div>
                                        <div className="col-md-6 mb-4">

                                            <div className="form-outline">
                                                <label className="form-label" >Password</label>
                                                <input type="password" id="lastName" className="form-control form-control-lg" name="password"
                                                    value={password}
                                                    placeholder="enter password"
                                                    onChange={(e) => setPassword(e.target.value)} />
                                                {errors.password && <span className="text-danger">{errors.password}</span>}
                                            </div>

                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">

                                            <div className="form-outline">
                                                <label className="form-label"  >Email</label>
                                                <input type="email" id="emailAddress" className="form-control form-control-lg" name="email" value={email}
                                                    onChange={(e) => setMail(e.target.value)} 
                                                    placeholder="enter email" />
                                                {errors.email && <span className="text-danger">{errors.email}</span>}
                                            </div>

                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">

                                            <div className="form-outline">
                                                <label className="form-label"  >Phone Number</label>
                                                <input type="tel" id="phoneNumber" className="form-control form-control-lg" name="phone" value={phone}
                                                    onChange={(e) => setPhone(e.target.value)} placeholder="enter Phone no."/>
                                                {errors.phone && <span className="text-danger">{errors.phone}</span>}
                                            </div>

                                        </div>
                                    </div>

                                    <div className="mt-4 pt-2">
                                        <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                                    </div>

                                </form><br /> <br/>
                                <h5>Upload Profile Picture:</h5>
                                <Profilepicture userid = {id}/>
                            </div>  
                            <Link href={role == 1 ?"/member/admin" : "/member/users"}>Go back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Edit