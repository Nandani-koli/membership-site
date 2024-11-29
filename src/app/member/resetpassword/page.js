'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../loading";

const Resetpassword = () => {

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [responsemsg,setresponseMsg] = useState('');
  const [errorresponseMsg, seterrorresponseMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validSession, setvalidSession] = useState(false);
  const [errors,setErrors] = useState('');

  useEffect(() => {
    (async () => {
      let res = await fetch('/api/resetpassword',{
        method : 'POST',
        body : JSON.stringify({token})
      })

      let result = await res.json();
  
        if(result.status == 200)
        {
            setvalidSession(true);
            return;
        }
        else if(result.status == 498)
        {
          seterrorresponseMsg(result.message);
        } 
        else{
          seterrorresponseMsg(result.message);
        }
    })();
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateErr = {};

    if (!password) {
      validateErr.password = 'Password is required';
    }
    if (!confirmpassword) {
      validateErr.confirmpassword = 'Confirm password is required';
    } else if (password != confirmpassword) {
      validateErr.confirmpassword = 'Password did not match';
    }

    if (Object.keys(validateErr).length > 0) {
      setErrors(validateErr);
    } else {
      setErrors({});
      setIsLoading(true);
      try {
        const res = await fetch('/api/resetpassword', {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            token : token
          }),
        });
        let result = await res.json();

        setIsLoading(false);

        if(result.status == 200)
        {
          setresponseMsg(result.message)

          setTimeout(() => {
            setresponseMsg('')
            router.push('/member/login'); 
          }, 2000);
        }
        else if(result.status == 498)
        {
          setresponseMsg(result.message);
        } 
        else{
          setresponseMsg(result.message);
        }

      } catch (error) {
        throw new Error(error);
      }
    }
  };

  return (
     
    <section className="vh-100 gradient-custom" style={{ backgroundColor: '#e3f2fd' }}>

      {validSession ?

      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Change Your Password</h3>
                {isLoading && <Loading />}
                {responsemsg && <h4 className="text-success">{responsemsg}</h4>}
                <form onSubmit={handleSubmit}>

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

                  <div className="mt-4 pt-2">
                    <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div> 
      :

      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <h4 className="text-danger m-5">{errorresponseMsg}</h4>
      </div>
}
    </section> 
    

  )
}

export default Resetpassword