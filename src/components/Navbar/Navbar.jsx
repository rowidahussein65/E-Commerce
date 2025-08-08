import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { authContext } from "../../Context/AuthContextProvider";

// لو عندك context للكارت (cartContext)، ممكن تستدعيه هنا عشان تجيب عدد العناصر
// لو مش عندك، ممكن تجيبي العدد من localStorage.

export function Navbar() {
  const { token, setToken } = useContext(authContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // هنا بنجيب عدد العناصر في الكارت من localStorage كمثال:
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = storedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalCount);
  }, []);

  // لو عندك إضافة في الكارت من صفحة ثانية وعايزة تحدث العداد، ممكن تستخدم Context أو event system.

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="bg-white shadow fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="h-10" />
          {/* <span className="ml-2 font-bold text-xl text-green-600">MyStore</span> */}
        </Link>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="lg:hidden text-3xl text-green-600 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg
            className={`w-8 h-8 transition-transform duration-300 ${
              open ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 font-medium text-green-700 items-center">
          {token && (
            <>
              <li>
                <Link
                  to="/"
                  className="hover:text-green-900 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-green-900 transition-colors duration-200"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-green-900 transition-colors duration-200"
                >
                  WishList
                </Link>
              </li>
              <li>
                <Link
                  to="/brands"
                  className="hover:text-green-900 transition-colors duration-200"
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="hover:text-green-900 transition-colors duration-200"
                >
                  Categories
                </Link>
              </li>

              {/* هنا بدل نص Cart حطيت أيقونة + badge */}
              <li className="relative">
                <Link
                  to="/cart"
                  className="hover:text-green-900 transition-colors duration-200 flex items-center"
                >
                  <i className="fas fa-shopping-cart text-2xl"></i>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Right Side (Social + Auth Links) */}
        <div
          className={`${
            open ? "flex" : "hidden"
          } flex-col lg:flex-row lg:flex items-center gap-6 mt-4 lg:mt-0`}
        >
          <ul className="flex items-center space-x-4 text-green-600 text-xl">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-green-900 transition-colors duration-200"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-green-900 transition-colors duration-200"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-green-900 transition-colors duration-200"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>

          <ul className="flex flex-col lg:flex-row items-center gap-6 font-medium text-green-700">
            {token ? (
              <li>
                <button
                  onClick={logout}
                  className="text-red-600 hover:text-red-800 transition-colors duration-200"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-green-900 transition-colors duration-200"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-green-900 transition-colors duration-200"
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {open && token && (
        <ul className="lg:hidden bg-white shadow-lg py-4 space-y-3 px-6 font-medium text-green-700">
          <li>
            <Link
              to="/"
              className="block hover:text-green-900 transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="block hover:text-green-900 transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/wishlist"
              className="block hover:text-green-900 transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              WishList
            </Link>
          </li>
          <li>
            <Link
              to="/brands"
              className="block hover:text-green-900 transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              Brands
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              className="block hover:text-green-900 transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="block hover:text-green-900 transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              Cart
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
