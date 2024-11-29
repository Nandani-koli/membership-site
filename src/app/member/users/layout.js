import Footer from "../components/Footer";
import UserNav from "../components/userNav";

export default function userLayout({ children }) {

    return (
        <div>
            <UserNav />
            {children}
            <Footer />
        </div>
    )
}
