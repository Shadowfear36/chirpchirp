import { React, useContext, useState } from 'react'
import { GlobalContext } from "../context/user";
import { useNavigate } from 'react-router-dom';
import Header from './Header.js';

export default function Login() {


    //allow navigation
    const navigate = useNavigate();
    // initial form state
    const initialState = {
      username: "",
      password: ""
    }
    //form state initialization
    const [formData, setFormData] = useState(initialState);

    // initialize Global Context
    const globalState = useContext(GlobalContext);

    // update global state of page to current page
    globalState.page = "login";

   // handle form input Change
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }


  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //fetch users from database by username inputed
    fetch(`http://localhost:9292/user/${formData.username}`)
    .then(res => res.json())
    .then(userData => {
      if (userData === null) {
        alert("User not found");
      } else if (userData.password !== formData.password) {
        alert("Password is incorrect");
      } else if (userData.username === formData.username && userData.password === formData.password) {
        globalState.isLoggedIn = true;
        globalState.userId = userData.id;
        globalState.username = userData.username;
        globalState.name = userData.name;
        globalState.email = userData.email;
        globalState.banner = userData.bannerURL;
        globalState.pfp = userData.pfpURL;
        navigate(`/${globalState.username}`)
      }
    })
  }

  return (
    <div id="login-page-container">
        <Header/>
        <div id="login-form-container">
          <h1 class="font-proza-libre text-6xl font-bold text-center text-purple p-4">Login Here:</h1>
          <div class="font-proza-libre text-purple ml-4">
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
                name="username"
                type="text"
                placeholder="Username"
                value={formData.email}
                class="rounded p-3 mx-1 mr-4 bg-blue h-15 m-6 text-center"
              />
              <div>
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  class="rounded p-3 mx-1 mr-4 bg-blue w-56 h-15 m-5 text-center text-lg"
                />
              </div>
              <button
                type="submit"
                class="text-purple  hover:text-blue text-4xl font-bold p-5"
                >Login
              </button>
            </form>
          </div>
        </div>
    </div>

  )
}
