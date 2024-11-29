'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import Invoice from '../components/invoice';
import Link from 'next/link';
import Loading from '../loading';

const Order = () => {
  const [data, setdata] = useState();
  const [isloading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  useEffect(() => {
    (async () => {
      try {
        let res = await fetch(`/api/payment?session_id=${session_id}`, {
          method: 'PUT'
        });
        let data = await res.json();
        setdata(data)
        setIsLoading(false)

      } catch (error) {
        throw new Error(error.message);
      }
    })();
  }, [])

  return (
    <>
      {isloading ? <Loading /> : null}
      {data ? <><h4 className='text-center text-success'>Thank You!... Your Payment {data.status}</h4>
        <h5 className='text-center text-success'>Email has been sent with the payment receipt on your email id</h5>
        <Invoice id = {data.orderid}/> 
        <div className="text-center" >
        <Link href={'/member/users'} ><u className="text-info">Go to Profile</u></Link>
      </div>
        </> : null
      }
    </>

  )
}

export default Order