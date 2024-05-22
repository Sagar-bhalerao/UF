
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || 'default');

  const { isAuthenticated, role, id, utheme, } = useAuth();
  const closeDropdown = () => {
    let dropdown = document.getElementById("menu");
    dropdown.classList.remove("ul");
    dropdown.classList.add("hidden");

  }

  useEffect(() => {
    // backend theme
    if (utheme) {
      setTheme(utheme);
    } else {
      setTheme('default');
    }
  }, [utheme, theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

  }, [theme]);
  useEffect(() => {

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [theme]);

  const handleThemeChange = async (selectedTheme) => {
    setTheme(selectedTheme);
    try {
      let body = {
        theme: selectedTheme,
        userId: id,
      }
      console.log(body);
      const responce = await axios.put("http://192.168.179.25:5002/theme", body);
    } catch (error) {
      console.log("error in theme api", error);
    }
  }


  return (
    <>
      <div className="navbar bg-base-300 sticky top-0 w-full border-b border-base-800 z-10 ">

        {/* mobile menu */}       
        <div className="flex-none">

          <div className="drawer lg:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <label className="btn btn-circle swap swap-rotate z-10" htmlFor="my-drawer">
              <svg className="swap-off fill-current [:checked~*_&]:!-rotate-45 [:checked~*_&]:!opacity-0" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
              <svg className="swap-on fill-current [:checked~*_&]:!rotate-0 [:checked~*_&]:!opacity-100" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
            </label>

            <div className="drawer-content"></div>
            <div className="drawer-side">
              <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content mt-10">
                {role === "admin" ? (<>
                  <ul className="menu bg-base-200 w-56 rounded-box">
                    <li><Link onClick={() => document.getElementById("my-drawer").checked = false}>Home</Link></li>
                    <li>
                      <details >
                        <summary onClick={() => document.getElementsByTagName("details").checked = false} >Master</summary>
                        <ul>
                          <li><Link onClick={() => document.getElementById("my-drawer").checked = false} to="/MemberView">Member</Link></li>
                          <li><Link onClick={() => document.getElementById("my-drawer").checked = false} to="/GroupView">Group</Link></li>
                          <li><Link onClick={() => document.getElementById("my-drawer").checked = false} to='/AccountView'>Account</Link></li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details >
                        <summary>Transaction</summary>
                        <ul>
                          <li><Link onClick={() => document.getElementById("my-drawer").checked = false} to="/ApplicationView">Application</Link></li>
                          <li><Link onClick={() => document.getElementById("my-drawer").checked = false} to="/SalaryUpload">Salary Upload</Link></li>
                          <li><Link onClick={() => document.getElementById("my-drawer").checked = false} to='/VoucherEntryView'>Voucher Entry</Link></li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details >
                        <summary>Reports</summary>
                        <ul>
                          <li><Link onClick={() => document.getElementById("my-drawer").checked = false} to="/Ledger">Ledger</Link></li>
                          <li><a>Memeber</a></li>
                        </ul>
                      </details>
                    </li>
                  </ul>

                </>) : (<>

                  <li><Link onClick={() => document.getElementById("my-drawer").checked = false}>Home</Link></li>

                  <li>
                    <details>
                      <summary>Master</summary>
                      <ul>
                        <li><Link onClick={() => document.getElementById("my-drawer").checked = false} to="/MemberView">Member</Link></li>
                        <li><Link onClick={() => document.getElementById("my-drawer").checked = false} to="/GroupView">Group</Link></li>
                        <li><Link onClick={() => document.getElementById("my-drawer").checked = false} to='/AccountView'>Account</Link></li>
                      </ul>
                    </details>
                  </li>
                </>)}


              </ul>
            </div>
          </div>


          <a className="btn btn-ghost text-xl">Unique Foundation</a>
        </div>









        {/* main menu */}
        <div className="flex-auto">
          <div className="navbar-start hidden lg:flex">
            {/* dropdown menu */}

            {role === "admin" && isAuthenticated ? (<>
              <li className='my-4'><Link to="/">Home</Link></li>
              <div className="dropdown">
                <div tabIndex={2} role="button" className="btn m-1 bg-base-300">
                  Master
                </div>
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><Link onClick={closeDropdown} to="/MemberView">Member</Link></li>
                  <li><Link onClick={closeDropdown} to="/GroupView">Group</Link></li>
                  <li><Link onClick={closeDropdown} to='/AccountView'>Account</Link></li>

                </ul>
              </div>

              <div className="dropdown">
                <div tabIndex={2} role="button" className="btn m-1 bg-base-300">
                  Transaction
                </div>
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><Link onClick={closeDropdown} to="/ApplicationView">Application</Link></li>
                  <li><Link onClick={closeDropdown} to="/SalaryUpload">Salary Upload</Link></li>
                  <li><Link onClick={closeDropdown} to='/VoucherEntryView'>Voucher Entry</Link></li>

                </ul>
              </div>
              <div className="dropdown">
                <div tabIndex={2} role="button" className="btn m-1 bg-base-300">
                  Reports
                </div>
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><Link onClick={closeDropdown} to="/Ledger">Ledger</Link></li>
                  <li><a>Member</a></li>

                </ul>
              </div></>) : (
              null

            )}


          </div>


        </div>
        {/* theme */}
        {/* right side menu theme/user profile */}

        {isAuthenticated && (<div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            T

          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-15">
            <li><input onClick={() => handleThemeChange("dark")} type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" value="dark" /></li>
            <li><input onClick={() => handleThemeChange("luxury")} type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="luxury" value="luxury" /></li>
            <li><input onClick={() => handleThemeChange("night")} type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="night" value="night" /></li>
            <li><input onClick={() => handleThemeChange("light")} type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="light" value="light" /></li>
            <li><input onClick={() => handleThemeChange("forest")} type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="forest" value="forest" /></li>
          </ul>
        </div>)}

        <div className="flex-none gap-2 ">


          <div className="dropdown dropdown-end"  >
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" id='myDropdown'  >
              <div className={`w-10 rounded-full ${isAuthenticated && "bg-indigo-900"} `}>
                {/* {role && isAuthenticated ? (<div className='font-bold'>{fname.charAt(0)+ "" + lname.charAt(0)}</div>):( <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />)} */}
                {role && isAuthenticated ? <div className='text-lg  font-bold text-white  items-center mt-1 '> {sessionStorage.getItem("fname") + "" + sessionStorage.getItem("lname")}</div> : (<div className='flex justify-center font-extrabold text-purple-900'>  <CgProfile size={39} /></div>)}

                {/* <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
              </div>
            </div>
            <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"   >
              {isAuthenticated ? (<>
                <li>
                  <Link to="/Profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li></>) : null}


              {isAuthenticated ? (<li><Link to="/Logout">Logout</Link></li>) : (<><li><Link onClick={closeDropdown} to="/Signup">Sign up</Link></li>
                <li><Link onClick={closeDropdown} to="/Login">Log In</Link></li></>)}


            </ul>
          </div>



        </div>

      </div>


    </>
  )
}

export default Navbar;
