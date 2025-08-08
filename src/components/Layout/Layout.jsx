import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import Footer  from "../Footer/Footer"
import { Outlet , Link } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container my-5 mt-18">
        <Outlet /> {/* This will render Home, About, etc. */}
      </div>
      <Footer />
    </>
  )
}
