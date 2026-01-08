import React from 'react'

import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header>
      <div>
        <div>

          <h1>ThinkVault</h1>

          <div>
            <Link to={"/notes/create"}>
              <PlusIcon />
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar; 