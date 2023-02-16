import { React, useContext } from 'react';
import { GlobalContext } from "../context/user";
import { NavLink } from 'react-router-dom';


export default function Header() {

    // initialize Global Context
    const globalState = useContext(GlobalContext);
    const profileLink = "/" + globalState.username

    function checkPage() {
      if (globalState.page === "login") {
        return <div id="header-btn-wrapper"><NavLink to= "/signup"><button className="headerBtn" class="m-5 text-2xl">Sign Up</button></NavLink></div>
      } else if (globalState.page === "signup") {
        return <div id="header-btn-wrapper"><NavLink to= "/"><button className="headerBtn" class="m-5 text-2xl">Login</button></NavLink></div>
      } else if (globalState.isLoggedIn === true) {
        return <div id="header-img-wrapper"><NavLink to={profileLink}><img className="headerImg" class="justify-end" src={globalState.pfp}/></NavLink><p>{globalState.name}</p></div>
      } else {
       return <div>
                <NavLink to= "/signup">
                  <button className="headerBtn">Sign Up</button>
                </NavLink>
                <NavLink to= "/">
                  <button className="headerBtn">Login</button>
                </NavLink>
              </div>
      }
    }

  return (
    <div className="header-container" class="font-proza-libre text-7xl font-bold text-left text-purple bg-green p-4">
      <div id="logo-wrapper">
        <h1 id="logo">ChirpChirp</h1>
      </div>
       <div id="right-header-container">
        {checkPage()}
       </div>
    </div>
  )
}

export {Header}