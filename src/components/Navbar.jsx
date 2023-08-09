import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium font-rta"
      >
        <Link
          to="/"
          className="flex items-center text-white hover:text-deep-orange-500 transition-colors"
        >
          General
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium font-rta"
      >
        <Link
          to="/business"
          className="flex items-center text-white hover:text-deep-orange-500 transition-colors"
        >
          Buisness
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium font-rta"
      >
        <Link
          to="/entertainment"
          className="flex items-center text-white hover:text-deep-orange-500 transition-colors"
        >
          Entertainment
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium font-rta"
      >
        <Link
          to="/health"
          className="flex items-center text-white hover:text-deep-orange-500 transition-colors"
        >
          Health
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium font-rta"
      >
        <Link
          to="/science"
          className="flex items-center text-white hover:text-deep-orange-500 transition-colors"
        >
          Science
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium font-rta"
      >
        <Link
          to="/sports"
          className="flex items-center text-white hover:text-deep-orange-500 transition-colors"
        >
          Sports
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium font-rta"
      >
        <Link
          to="/technology"
          className="flex items-center text-white hover:text-deep-orange-500 transition-colors"
        >
          Technology
        </Link>
      </Typography>
    </ul>
  );
}

// Main Navigationbar component
export function Navigationbar() {
  // State to control the visibility of the collapsible menu
  const [openNav, setOpenNav] = React.useState(false);

  // Function to handle window resize and close the menu
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  // Attach window resize event listener when component mounts
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar
      variant="gradient"
      className="font-rta px-6 py-3 max-w-full bg-[#191414] sticky"
    >
      <div className="flex items-center justify-between  text-white">
        {/* Logo */}
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="font-rta font-black mr-4 cursor-pointer py-1.5 md:justify-center hover:text-deep-orange-500  "
        >
          <Link to="/">Fast News</Link>
        </Typography>
        {/* Navigation links for larger screens */}
        <div className="hidden lg:block">
          <NavList />
        </div>
        {/* Menu button for small screens */}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {/* Toggle menu button icon based on openNav state */}
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      {/* Collapsible menu */}
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
