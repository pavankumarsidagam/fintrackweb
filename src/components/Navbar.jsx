import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMenu,
  FiHome,
  FiList,
  FiDollarSign,
  FiLogOut,
} from "react-icons/fi";
import { BsPiggyBank } from "react-icons/bs";

const menuItems = [
  { name: "Dashboard", to: "/", icon: <FiHome /> },
  { name: "Transactions", to: "/transactions", icon: <FiList /> },
  { name: "Members", to: "/users", icon: <FiUser /> },
  { name: "Reports", to: "/reports", icon: <FiDollarSign /> },
];

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [animate, setAnimate] = useState("slideUp");
  const [mobileVisible, setMobileVisible] = useState(false);
  const accountRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setShowAccountMenu(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".menu-button")
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle mobile menu animation and unmount
  useEffect(() => {
    if (showMobileMenu) {
      setMobileVisible(true);
      setAnimate("slideUp");
    } else {
      setAnimate("slideDown");
      setTimeout(() => setMobileVisible(false), 300);
    }
  }, [showMobileMenu]);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 
        w-[95%] max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1600px]
        bg-gradient-to-r from-teal-600 via-teal-800 to-black 
        text-white rounded-2xl shadow-xl 
        px-6 py-4 
        backdrop-blur-md bg-opacity-80 
        flex justify-between items-center 
        z-50 transition-all duration-300">

        {/* Logo */}
        <div className="flex head items-center space-x-2 text-2xl font-bold font-poppins">
          <BsPiggyBank className="text-2xl text-white" />
          <span>FINTRACK</span>
        </div>

        {/* Desktop Menu */}
        <div className="subhead hidden md:flex space-x-8 items-center">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`hover:text-teal-300 ${
                location.pathname === item.to ? "text-teal-300" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Account Dropdown */}
          <div ref={accountRef} className="relative">
            <FiUser
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="h-6 w-6 cursor-pointer hover:text-teal-300"
            />
            <div
              className={`absolute right-0 mt-2 w-48 z-20 transform transition-all duration-300 ease-in-out ${
                showAccountMenu
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="bg-white backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl py-2 px-2 text-sm text-black">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <FiUser /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition w-full text-left"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Hamburger for small screen */}
          <div className="md:hidden menu-button">
            <FiMenu
              onClick={() => setShowMobileMenu((prev) => !prev)}
              className="h-6 w-6 cursor-pointer"
            />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Slide Up/Down */}
      {mobileVisible && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black bg-opacity-40">
          <div
            ref={mobileMenuRef}
            className={`w-[90%] max-w-md h-[60%] bg-white text-gray-800 
                      rounded-3xl shadow-2xl p-6 text-lg font-semibold font-inter 
                      transform transition-all duration-300 ease-in-out 
                      overflow-y-auto animate-${animate}`}
          >
            <div className="flex flex-col space-y-6 items-center justify-center h-full">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-2 ${
                    location.pathname === item.to ? "text-teal-600" : ""
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
