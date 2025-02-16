import {useState} from "react";
import { Link } from "react-router-dom";
import PersonalExpenseLogo from "./PersonalExpenseLogo";
 
function Homenavbar() {
    const [open, setOpen] = useState(false);

    return (
      <nav className="bg-white shadow-md w-full fixed top-0 left-0 h-auto p-2">
        <div className="container mx-auto flex justify-between items-center py-2 px-6">
          {/* Logo */}
          <div className="font-bold">
            <PersonalExpenseLogo/>
          </div>
  
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to='/' className="px-4 py-2 bg-blue-800 text-white text-xs rounded-md">
              Sign In
            </Link>
          </div>
  
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setOpen(!open)}
          >
            {open ? "✖" : "☰"}
          </button>
        </div>
  
        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-white border-t">
            <Link to = '/' className="block w-full text-left py-2 px-6 bg-blue-600 text-white">
              Sign In
            </Link>
          </div>
        )}
      </nav>
  );
}

export default Homenavbar;