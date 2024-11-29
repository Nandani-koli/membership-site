import Link from "next/link";
import Adduserform from "../components/Adduserform";

const Register = () => {
    return (
        <>
        <section className="vh-100 gradient-custom" style={{ backgroundColor: '#e3f2fd' }}>
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration">
                        <div className="card-body p-4 p-md-5">
                            <Adduserform title = "Registration Form"/>
                            <Link href="/member/login">Existing user ? Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}

export default Register

