'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
import exportToCsv from "@/utils/exportToCsv";

const fetchUsers = async (currentPage, keyword) => {
    try {
        let res = await fetch(`/api/users?page=${currentPage}&keyword=${keyword}`, {
            cache: "no-store"
        });
        if (!res) {
            throw new Error("failed to fetch users");
        }
        let details = await res.json();
        return details;

    } catch (error) {
        throw new Error(error);
    }
}
const Admin = () => {

    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const details = await fetchUsers(currentPage, keyword);
            setUsers(details.users);
            setTotalPages(details.totalPages);

            setIsLoading(false)
        })();
    }, [currentPage]);



    function handlePageChange(page) {
        setCurrentPage(page);
    }

    async function handleSearch(e) {
        e.preventDefault();
        setCurrentPage(1);
        const { users, totalPages } = await fetchUsers(currentPage, keyword);
        setUsers(users);
        setTotalPages(totalPages);
    };

    const deleteUser = async (id) => {
        let confirmed = confirm("Are you sure you want to delete?");
        if (confirmed) {
            try {
                let res = await fetch(`/api/users?id=${id}`, {
                    method: 'DELETE',
                });
                let result = await res.json();

                if (result.status == 200) {
                    const details = await fetchUsers(currentPage, keyword);
                    setUsers(details.users);
                    setTotalPages(details.totalPages);
                } else {
                    throw new Error("failed to delete user");
                }
            }
            catch (error) {
                throw new Error(error);
            }
        }
    }

    async function handleExport() {
        try {
            let res = await fetch("/api/users", {
                method: 'POST'
            })
            let jsonData = await res.json();

            exportToCsv(jsonData, "userslist.csv");

        } catch (error) {
            throw new Error(error.message);
        }
    }

    return (
        <>
            {/* Display Users  */}

            <section>
                <div className="card shadow-2-strong card-registration">

                    <div className="card-body p-4 p-md-5">
                        <form className="d-flex float-end" onSubmit={handleSearch} >
                            <input className="form-control me-2"
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Enter name or email"
                            />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registrated Users</h3>
                        <button className="btn btn-primary col" onClick={handleExport}>Export</button>


                        {(users.length == 0) ? isLoading ? <Loading /> : (<h1>No user Found</h1>) :
                            <>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((data, i) => {
                                            return (<tr key={i}>
                                                <td>{data.name}</td>
                                                <td>{data.email}</td>
                                                <td>{data.phone}</td>
                                                <td>
                                                    <div className="row">
                                                        <button onClick={() => deleteUser(data._id)} className="col btn btn-outline-danger">Delete</button>
                                                        <button onClick={() => { router.push(`/member/edituser/${data._id}`) }} className="col btn btn-outline-success">Edit</button>
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
                                </div> </>
                        }  </div>
                </div>

            </section>
        </>
    )
}

export default Admin