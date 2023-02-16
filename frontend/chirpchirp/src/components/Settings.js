import { React, useState, useContext } from 'react'
import Nav from './Nav'
import Header from './Header'
import { GlobalContext } from "../context/user";


export default function Settings() {
  // initialize Global Context
  const globalState = useContext(GlobalContext);

  globalState.page = "Settings";

  //initial form state
  const initialState = {
    name: "",
    email: "",
    username: "",
    bannerURL: "",
    password: "",
    pfpURL: ""
  }
  //form state initilization
  const [formData, setFormData] = useState(initialState);
  
   // handle form input Change
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission 
    fetch(`http://localhost:9292/users/${globalState.username}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        "name": formData.name,
        "email": formData.email,
        "password": formData.password,
        "pfpURL": formData.pfp,
        "bannerURL": formData.banner
      })
    }).then(res => res.json())
    .then(obj => {
      globalState.name = obj.name;
      globalState.email = obj.email;
      globalState.banner = obj.bannerURL;
      globalState.pfp = obj.pfpURL;
      }
    )


  };

  return (
    <>
      <div>
        <Header />
        <Nav />
        <h1 class="font-proza-libre text-6xl font-bold text-center text-purple p-4 ml-40">Settings</h1>
      </div>
    <div class="font-proza-libre text-purple ml-40">
      <form onSubmit={handleSubmit}>
          <label class="text-xl p-5">Name:</label>
          <input 
            name="name"
            type="text"
            placeholder={globalState.name} 
            value={formData.name} 
            onChange={handleChange}
            class="rounded mx-1 bg-green text-purple"
          />
          <label class="text-xl p-5">E-mail:</label>
          <input 
            name="email"
            type="text" 
            placeholder={globalState.email}
            value={formData.email} 
            onChange={handleChange}
            class="rounded mx-1 p-5 bg-green text-purple"
          />
          <label class="text-xl p-5">Password:</label>
          <input 
            name="password"
            type="password"
            placeholder='*******'
            value={formData.password}
            onChange={handleChange}
            class="rounded p-3 mx-1 mr-4 bg-green w-56 h-15 text-purple"
          />
          <label class="text-xl p-5">Profile Image URL:</label>
          <input 
            name="pfpURL"
            type="text"
            placeholder={globalState.pfp}
            value={formData.pfp} 
            onChange={handleChange}
            class="rounded mx-1 bg-green text-purple"
          />
          <label class="text-xl p-5">Banner URL:</label>
          <input 
            name="bannerURL"
            type="text" 
            value={formData.banner} 
            placeholder={globalState.banner}
            onChange={handleChange}
            class="rounded mx-1 bg-green text-purple"
          />

        <button 
          type="submit"
          class="text-purple  hover:text-green text-4xl font-bold text-purple"
          >Save
        </button>
      </form>
      
      {/* handle deleting user account */}
      <button>Delete Account</button>
    </div>
    </>
  )
}
