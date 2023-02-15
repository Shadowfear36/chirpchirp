import { React, useContext } from 'react'
import { NavLink } from "react-router-dom"
import { GlobalContext } from "../context/user";



export default function Nav() {
    const globalState = useContext(GlobalContext);
    const name = globalState.username
    const flockLink = "/" + name + "/flock"
    const settingsLink = "/" + name + "/settings"
    const nestLink = "/" + name + "/nest"

  return (
    <div class="text-2xl text-white w-60 h-full shadow-md bg-purple px-1 absolute font-proza-libre p-10">
        <ul class="relative">
            <li class="relative p-5 hover:text-blue">
                <NavLink to={nestLink} >🪺 Nest</NavLink>
            </li>
            <li class="relative p-5 hover:text-blue">
                <NavLink to="/explore">#️⃣ Explore</NavLink>
            </li>
            <li class="relative p-5 hover:text-blue">
                <NavLink to={flockLink}>➕ Flock</NavLink>
            </li>
            <li class="relative p-5 hover:text-blue">
                <NavLink to={settingsLink}>⚙️ Settings</NavLink>
            </li>
        </ul>
    </div>
  )
}
