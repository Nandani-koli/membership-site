import Link from "next/link";
import { Bangers } from "next/font/google";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container-fluid">
          {/* Brand Name */}
          <div className={bangers.className}>
            <Link href="/" className="navbar-brand fs-3">
              Nandani Koli
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto text-center">
              <li className="nav-item">
                <Link href="/static/aboutme" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/static/skills" className="nav-link">
                  Skills
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/static/experience" className="nav-link">
                  Experience
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/static/projects" className="nav-link">
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/static/contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
