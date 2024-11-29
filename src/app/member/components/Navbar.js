import Link from "next/link"
import LogoutButton from "./LogoutButton"
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg pt-3 pb-3 ps-4 pe-4" style={{ backgroundColor: '#e3f2fd' }}>
    <div className="container-fluid">
        <div><Link href={"/member/admin"} className="navbar-brand" >Welcome Admin</Link></div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav text-center  ms-auto mb-2 mb-lg-0">

                <li className="nav-item btn btn-outline-success m-2">
                    <Link href={"/member/admin/adduser"} className="nav-link ">Add User</Link>
                </li>

                <li className="nav-item btn btn-outline-success m-2">
                    <Link href={"/member/admin/orders"} className="nav-link ">Orders</Link>
                </li>
                <LogoutButton />

            </ul>
        </div>
    </div>
</nav>
  )
}

export default Navbar