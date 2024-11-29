'use client'
import Invoice from "../components/invoice"
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import Footer from "../components/Footer";

const OrderInvoice = () => {

  const searchParams = useSearchParams();

  const id = searchParams.get('orderId');

  const token = Cookies.get('token');
  const tokeninfo = jwtDecode(token);

  return (
    <>
      {id ?
      <>
        <Invoice id={id} />
        <div className="text-center" >
        {tokeninfo.role == 1 ? <Link href={'/member/admin/orders'} ><u className="text-info">Go Back</u></Link> :
          <Link href={'/member/users/myOrders'} ><u className="text-info">Go to Orders</u></Link>
        }
      </div> </>
         :

        <div className="card align-items-center p-5 m-5">
          <h1 className="text-center">You haven't placed any order yet.</h1>
          <h4><Link href={'/member'}>Select from our best plans</Link></h4>
        </div>
      }

      <Footer />
    </>
  )
}

export default OrderInvoice