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
        <h1 class="font-proza-libre text-5xl font-bold text-purple p-4">Settings</h1>
      </div>

    <div class="font-proza-libre text-purple m-5">
      <form onSubmit={handleSubmit}>
        <div>
            <label class="text-xl p-5">Name:</label>
            <input 
              name="name"
              type="text"
              placeholder={globalState.name} 
              value={formData.name} 
              onChange={handleChange}
              class="mr-3 py-5 px-4 h-2 border border-purple rounded mb-2 bg-green"
              />
          </div>

          <div>
            <label class="text-xl p-5">E-mail:</label>
            <input 
              name="email"
              type="text" 
              placeholder={globalState.email}
              value={formData.email} 
              onChange={handleChange}
              class="mr-3 py-5 px-4 h-2 border border-purple rounded mb-2 bg-green"
            />
          </div>

          <div>
            <label class="text-xl p-5">Password:</label>
            <input 
              name="password"
              type="password"
              placeholder='*******'
              value={formData.password}
              onChange={handleChange}
              class="mr-10 py-5 px-4 h-2 border border-purple rounded mb-2 bg-green"
            />
          </div>

          <div>
            <label class="text-xl p-5">Profile URL:</label>
            <input 
              name="pfpURL"
              type="text"
              placeholder="Profile Image URL"
              value={formData.pfp} 
              onChange={handleChange}
              class="mr-14 py-5 px-4 h-2 border border-purple rounded mb-2 bg-green"
            />
          </div>

          <div>
            <label class="text-xl p-5">Banner URL:</label>
            <input 
              name="bannerURL"
              type="text" 
              value={formData.banner} 
              placeholder="Banner Image URL"
              onChange={handleChange}
              class="mr-14 py-5 px-4 h-2 border border-purple rounded mb-2 bg-green"
            />
          </div>

          <div>
            <button 
              type="submit"
              class="bg-purple hover:bg-green text-white font-bold py-2 px-6 rounded-full text-lg m-5"
              >Save
            </button>
          </div>
      </form>
      {/* handle deleting user account */}

      <div>
        <button
          class="bg-purple hover:bg-green text-white font-bold py-2 px-6 rounded-full text-lg"
          >Delete Account
        </button>
      </div>
    </div>
    </>
  )
}
