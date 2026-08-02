import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useThemeStore from "../store/themeStore";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, Moon, LogOut, LayoutDashboard,
  ScanSearch, Clock4, Hammer, Zap, Menu, X
} from "lucide-react";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/analyze", label: "Analyze", icon: ScanSearch },
  { path: "/history", label: "History", icon: Clock4 },
  { path: "/builder", label: "Builder", icon: Hammer },
];

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { dark, toggle } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;
  const closeMobile = () => setMobileOpen(false);

  // 🔥 Prevent background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        .navbar-root {
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          width: 100%;
          max-width: 100vw;
        }

        .logo-wordmark {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 10px;
          font-size: 13px;
          text-decoration: none;
          white-space: nowrap;
        }

        .nav-link.active {
          color: #6366f1;
        }

        .nav-icon-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          cursor: pointer;
          flex-shrink: 0;
        }

        .user-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          max-width: 120px;
          overflow: hidden;
        }

        .user-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #6366f1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 11px;
        }

        .user-name {
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .logout-btn {
          font-size: 12px;
          padding: 6px 8px;
        }

        .mobile-drawer {
          position: fixed;
          top: 60px;
          left: 0;
          width: 100%;
          max-width: 100vw;
          background: ${dark ? "#0a0a12" : "#fff"};
          padding: 10px;
          z-index: 50;
        }

        .mobile-nav-link {
          display: flex;
          gap: 10px;
          padding: 10px;
          text-decoration: none;
        }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          top: 60px;
          background: rgba(0,0,0,0.3);
          z-index: 40;
        }

        @media (max-width: 480px) {
          .logo-wordmark {
            font-size: 13px !important;
            max-width: 100px;
            overflow: hidden;
          }
        }
      `}</style>

      <nav className={`navbar-root ${dark ? "dark" : "light"}`}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 10px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >

          {/* LOGO */}
          <Link to="/dashboard" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 30,
              height: 30,
              background: "#6366f1",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Zap size={14} color="#fff" />
            </div>

       <span
  className="logo-wordmark"
  style={{
    fontSize: "clamp(14px, 3.5vw, 16px)",
    whiteSpace: "nowrap",
  }}
>
  <span className="hidden sm:inline">
    ATS<span style={{ color: "#6366f1" }}>.</span>Analyzer
  </span>
  <span className="sm:hidden">
    ATS
  </span>
</span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex">
            {NAV_LINKS.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path} className={`nav-link ${isActive(path) ? "active" : ""}`}>
                <Icon size={14} />
                {label}
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>

            <button className="nav-icon-btn" onClick={toggle}>
              {dark ? <Moon size={14} /> : <Sun size={14} />}
            </button>

            <div className="hidden md:flex user-chip">
              <div className="user-avatar">{user?.name?.[0]}</div>
              <span className="user-name">{user?.name}</span>
            </div>

            <button className="logout-btn hidden md:flex" onClick={handleLogout}>
              <LogOut size={14} />
            </button>

            {/* MOBILE MENU */}
            <button className="nav-icon-btn md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              onClick={closeMobile}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="mobile-drawer"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
            >
              {NAV_LINKS.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className="mobile-nav-link"
                  onClick={closeMobile}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}

              <hr />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="user-chip">
                  <div className="user-avatar">{user?.name?.[0]}</div>
                  <span className="user-name">{user?.name}</span>
                </div>

                <button onClick={handleLogout}>
                  <LogOut size={14} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}