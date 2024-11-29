'use client'
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LogoutButton = () => {

    const router = useRouter();

    const logout = async () => {
        try {
            Cookies.remove('token');
            setTimeout(() => {
                router.push('/member')
            }, 1000);

        } catch (error) {
            throw new Error(error);
        }
    }
    return (
        <button onClick={logout} className="nav-item btn btn-outline-danger m-2">
            Logout
        </button>
    )
}

export default LogoutButton

