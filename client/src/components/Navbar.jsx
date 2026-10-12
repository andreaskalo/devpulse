import { NavLink } from "react-router-dom";
import logo from "../assets/devPulseSmallLogo.png";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  return (
    <nav className="flex items-center justify-between px-6 py-2 bg-white border-b border-slate-200">
      <div className="flex items-center gap-2">
        <img src={logo} className="w-12 h-12" alt="DevPulse logo" />
        <span>DevPulse</span>
      </div>
      <div className="flex items-center gap-10">
        <NavLink
          to={"/dashboard"}
          className={({ isActive }) =>
            isActive
              ? "text-cyan-400 font-semibold"
              : "text-slate-600 hover:text-cyan-500"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to={"/saved"}
          className={({ isActive }) =>
            isActive
              ? "text-cyan-400 font-semibold"
              : "text-slate-600 hover:text-cyan-500"
          }
        >
          Saved Repositories
        </NavLink>
      </div>
      <div className="flex items-center gap-10">
        <span className="text-slate-700 font-medium">{currentUser?.username}</span>
        <button onClick={handleLogout} className="hover:text-red-500 cursor-pointer">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
