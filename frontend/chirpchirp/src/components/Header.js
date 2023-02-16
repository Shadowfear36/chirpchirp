import { React, useContext } from 'react';
import { GlobalContext } from "../context/user";
import { NavLink } from 'react-router-dom';


export default function Header() {

    // initialize Global Context
    const globalState = useContext(GlobalContext);
    const profileLink = "/" + globalState.username

    function checkPage() {
      if (globalState.page === "login") {
        return <div id="header-btn-wrapper"><NavLink to= "/signup">
            <button 
              className="headerBtn" 
              class="bg-purple hover:bg-green text-white font-bold py-2 px-6 rounded-full text-lg"
              >Sign Up
            </button>
            </NavLink>
            </div>
      } else if (globalState.page === "signup") {
        return <div id="header-btn-wrapper"><NavLink to= "/">
          <button 
            className="headerBtn" 
            class="bg-purple hover:bg-green text-white font-bold py-2 px-6 rounded-full text-lg"
            >Login
          </button>
          </NavLink>
          </div>
      } else if (globalState.isLoggedIn === true) {
        return <div id="header-img-wrapper">
          <NavLink to={profileLink}>
          <div class="absolute right-0 top-0">
            <img 
              className="headerImg"
              class="scale-75 h-40 pt-4"
              src={globalState.pfp}/>
          </div>
          </NavLink>
          <div>
            <p class="text-3xl pt-3 ml-4">{globalState.name}</p>
          </div>
        </div>
      } else {
       return <div>
                <NavLink to= "/signup">
                  <button
                    class="bg-purple hover:bg-green text-white font-bold py-2 px-6 rounded-full text-lg m-2"
                    >Sign Up
                  </button>
                </NavLink>
                <NavLink to= "/">
                  <button
                    class="bg-purple hover:bg-green text-white font-bold py-2 px-6 rounded-full text-lg m-2"
                    >Login
                  </button>
                </NavLink>
              </div>
      }
    }

  return (
    <div className="header-container" class="font-proza-libre text-7xl font-bold text-left text-purple bg-green p-4 w-screen z-0">
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