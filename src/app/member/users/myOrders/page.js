'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "../../loading";
import { useRouter } from "next/navigation";

const MyOrders = () => {

    const router = useRouter();
    const [orders, setorders] = useState([]);
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {

        (async () => {
            let res = await fetch('/api/userdetail/getOrders');
            let data = await res.json();
            setorders(data.orders);
            setIsLoading(false)
        })();
    }, []);

    return (

        <section className="vh-100 gradient-custom" style={{ backgroundColor: '#e3f2fd' }}>
            <div className="container py-5 h-100">
                <div className="justify-content-center">
                    <h1 className="text-center m-5">My Orders</h1>

                    {isloading ? <Loading /> : null}
                    {(orders.length == 0) ?
                        <div className="card align-items-center p-5 m-5">
                            <h1 className="text-center">You haven&apos;t placed any order yet.</h1>
                            <h4><Link href={'/member'}>Select from our best plans</Link></h4>
                        </div>
                        :
                        <div className="row row-cols-4">
                            {orders.map((data, i) => (
                            <div key={i} className="col card m-3" >
                                <div class="card-body">
                                    <h4 class="card-title">{data.orderName}</h4>
                                    <p class="card-text">Date :- {data.paymentDate}</p>
                                    <p class="card-text">Price :- &#x20B9;{data.price}</p>
                                    <button onClick={() => { router.push(`/member/orderinvoice?orderId=${data._id}`) }} className="col btn btn-outline-success">Details</button>
                                </div>
                            </div>
                            ))}
                        </div>
                    }

                </div></div>
        </section >
    )
}

export default MyOrders