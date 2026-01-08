import React from 'react'

import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            ThinkVault
          </h1>

          <div>
            <Link to={"/notes/create"} className="inline-flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 active:scale-95">
              <PlusIcon className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar; 