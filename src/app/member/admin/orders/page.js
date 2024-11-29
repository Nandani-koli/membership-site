'use client'
import exportToCsv from "@/utils/exportToCsv"
import { useEffect, useState } from "react"
import Loading from "../../loading"
import { useRouter } from "next/navigation"

async function fetchOrders(currentPage, keyword) {
    try {

        let res = await fetch(`/api/orders?page=${currentPage}&keyword=${keyword}`);
        let data = await res.json();

        return data;
    } catch (error) {
        throw new Error(error);
    }
}

const Orders = () => {

    const router = useRouter();

    const [orders, setorders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        (async () => {
            const { orderlist, totalPages } = await fetchOrders(currentPage, keyword);
            setorders(orderlist);
            setTotalPages(totalPages);
            setIsLoading(false);

        })();
    }, [currentPage])

    function handlePageChange(page) {
        setCurrentPage(page);
    }

    async function handleSearch(e) {
        e.preventDefault();
        setCurrentPage(1);
        const { orderlist, totalPages } = await fetchOrders(currentPage, keyword);
        setorders(orderlist);
        setTotalPages(totalPages);
    };

    async function handleExport()
    {
        try {
            let res = await fetch("/api/orders",{
                method : 'POST'
            })
            let jsonData = await res.json();

           exportToCsv(jsonData,"orderlist.csv");

        } catch (error) {
            throw new Error(error.message);
        }
    }

    return (
        <>
            <section>
                <div className="card shadow-2-strong card-registration">

                    <div className="card-body p-4 p-md-5">
                        <form className="d-flex float-end" onSubmit={handleSearch} >
                            <input className="form-control me-2"
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <h3 className="mb-4  col">Orders</h3>
                        <button className="btn btn-primary col" onClick={handleExport}>Export</button>

                        {(orders.length == 0) ? isLoading ? <Loading /> : (<h1>Not get any orders yet</h1>) :
                            <>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Plan Name</th>
                                            <th scope="col">Placed Date</th>
                                            <th scope="col">Invoice No.</th>
                                            <th scope="col">Price.</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((data, i) => {
                                            return (<tr key={i}>
                                                <td>{data.orderName}</td>
                                                <td>{data.paymentDate}</td>
                                                <td>{data.invoiceNumber}</td>
                                                <td>&#x20B9;{data.price}</td>
                                                <td>{data.userId.name}</td>
                                                <td>{data.userId.email}</td>
                                                <td>
                                                    <div className="row">
                                                        <button onClick={() => { router.push(`/member/orderinvoice?orderId=${data._id}`) }} className="col btn btn-outline-success">Get detail</button>
                                                    </div>
                                                </td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>

                                <div className="d-flex align-items-center justify-content-center">
                                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>&laquo; Prev</button>
                                    <h3 className="m-2">
                                        {currentPage}
                                    </h3>
                                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>Next &raquo;</button>
                                </div>
                            </>}
                    </div>
                </div>
            </section>

        </>
    )
}

export default Orders