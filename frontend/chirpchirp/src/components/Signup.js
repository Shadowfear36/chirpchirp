import { React, useState, useContext } from 'react'
import { GlobalContext } from "../context/user";
import { useNavigate } from 'react-router-dom';
import Header from "./Header.js"

export default function SignUp() {
    // allow navigation
    const navigate = useNavigate();
     // initial form state
     const initialState = {
      name: "",
      username: "",
      email: "",
      password: "",
      password2: "",
    }
    //form state initialization
    const [formData, setFormData] = useState(initialState);

    // initialize Global Context
    const globalState = useContext(GlobalContext);

    // update global state of page to current page
    globalState.page = "signup";

   // handle form input Change
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  //handle Sign Up form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:9292/user/${formData.username}`)
    .then(res => res.json())
    .then((userData) => {
      console.log(userData);
      if (userData !== null) {
        alert("Username already exists!")
      } 
      else if (userData === null) {

        if (formData.password !== formData.password2) {
          alert('Passwords do not match')
        } else if (formData.password.length < 5) {
          alert('Password is too short')
        } else {
            fetch('http://localhost:9292/users', {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify({
                "name": formData.name,
                "email": formData.email,
                "username": formData.username,
                "password": formData.password,
                "pfpURL": "https://via.placeholder.com/250",
                "bannerURL": "https://via.placeholder.com/1500x350"
              })
            })
            .then(res => res.json())
            .then((userData) => {
              globalState.isLoggedIn = true;
              globalState.userId = userData.id;
              globalState.username = userData.username;
              globalState.name = userData.name;
              globalState.email = userData.email;
              globalState.banner = userData.bannerURL;
              globalState.pfp = userData.pfpURL;
              console.log(userData);
              navigate(`/${formData.username}`)
            })
        }
      } else {
        alert("Error Occured")
      }
    })
  };
  return (
    <div>
        <Header/>
        <h1 class="font-proza-libre text-6xl font-bold text-center text-purple p-4">"Birds Of A Feather Flock Together"</h1>
        <h1 class="font-proza-libre text-4xl font-bold text-center text-purple p-4">Fill Out The Form To Sign Up:</h1>
        <div class="font-proza-libre text-purple flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              name="name" type="text"
              placeholder="Full Name"
              value={formData.name}
              class="w-full mr-3 py-5 px-4 h-2 border border-purple rounded mb-2 bg-green"
            />
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              class="w-full mr-3 py-5 px-4 h-2 border border-purple rounded mb-2 bg-green"
            />
            <input
              onChange={handleChange}
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              class="w-full mr-3 py-5 px-4 h-2 border border-purple rounded mb-2 bg-green"
            />
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              class="w-full mr-3 py-5 px-4 h-2 border border-purple rounded mb-2 bg-green"
            />
            <input
              onChange={handleChange}
              name="password2"
              type="password"
              placeholder="Confirm Password"
              value={formData.password2}
              class="w-full mr-3 py-5 px-4 h-2 border border-purple rounded mb-2 bg-green"
            />
            <div class="flex flex-col items-center">
              <button
                type="submit"
                class="bg-purple hover:bg-green text-white font-bold py-2 px-6 rounded-full text-lg"
                >Sign Up
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}
