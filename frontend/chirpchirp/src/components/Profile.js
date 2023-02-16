import {React, useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../context/user.js'
import Header from "./Header.js"
import Nav from './Nav.js'
import ChirpList from './ChirpList.js'

export default function Profile() {

  // initialize Global Context
  const globalState = useContext(GlobalContext);

  //set global state page to profile page
  globalState.page = 'profile';
  //initial form state + defaults for post
  const initialState = {
    content: "",
    likes: 0,
    user_id: globalState.userId,
    username: globalState.userName,
    pfpURL: globalState.pfp
  }
  //create state for Chirp Form
  const [formData, setFormData] = useState(initialState);

  // handle form input Change
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  //list state for Chirp List
  const [list, setList] = useState([])

  //handle chirp form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9292/user/${globalState.username}/posts`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(formData)
    }).then(res => res.json())
    .then(obj => {
      let newList = list.shift(obj)
      setList(newList)
    });
  }

  //fetch users posts to pass to ChirpList
  useEffect(() => {
    fetch(`http://localhost:9292/user/${globalState.username}/posts`)
    .then(res => res.json())
    .then(obj => {
      setList(obj)
    })
  },[])

  return (
    // is user logged in?
    globalState.isLoggedIn?
    <>
      {/* logged in  */}
      <Header />
      <Nav/>

      <div class="font-proza-libre text-6xl font-bold text-center text-purple p-4">
        <h1>Create a Chirp</h1>
      </div>

      <div class="font-proza-libre text-purple">
        <form onSubmit={handleSubmit}>
            <input
              name="content"
              onChange={handleChange}
              type="textarea"
              id="chirp"
              placeholder=" Add chirp content"
              class="h-32 w-96 rounded m-5 mx-1 text-xl bg-green border border-purple"
            />
        </form>
      </div>

      <div class="font font-proza-libre flex flex-col items-center">
        <button
          type="submit"
          id="submitChirp"
          class="bg-purple hover:bg-green text-white font-bold py-2 px-6 rounded-full text-lg"
          >Chirp
        </button>
      </div>

      <div class="flex flex-wrap justify-center p-4">
        <ChirpList
          list={list}
        />
      </div>

    </> :
    <>
      {/* not logged in */}
      <Header />
      <Nav/>
      <img src={globalState.pfp}/> <img src={"bannerImage"}/>
      <h6>You are not logged in</h6>
      <p>Please Login</p>
    </>
  )
}
