import {React, useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../context/user.js'
import Header from "./Header.js"
import Nav from './Nav.js'
import ChirpList from './ChirpList.js'
import { useParams, NavLink } from "react-router-dom";

export default function Profile() {

  // initialize Global Context
  const globalState = useContext(GlobalContext);

  //pull username param from url
  const { userName } = useParams();

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

  //show add chirp state
  const [showAddChirp, setShowAddChirp] = useState(false)

  //show add to flock state
  const [showAddToFlock, setShowAddToFlock] = useState(false)

  //logic for show add based on if logged in or not
  const checkParams = () => {
    if (globalState.username === userName) {
      setShowAddChirp(true)
      setShowAddToFlock(false)
    } else {
      setShowAddChirp(false)
      setShowAddToFlock(true)
    }
  }

  //keep from looping
  useEffect(() => {
    checkParams()
  },[]);

  //state for the current displayed user
  const [displayedUser, setDisplayedUser] = useState({});

  //state for if User is currently Following displayed User
  const [isInFlock, setIsInFlock] = useState(false);

  //handle chirp form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:9292/user/${userName}/posts/new`,
    { headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(obj => setList(obj))
  }

  //handle add user to flock list
  const handleAddToFlock = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9292/flock/${globalState.username}/add/${displayedUser.username}`,
      { headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify()
      }
    )
    setIsInFlock(true)
  }

  //handle remove user from flock list
  const handleRemoveFromFlock = (e) => {
    e.preventDefault()
    fetch(`http://localhost:9292/flock/${globalState.username}/remove/${displayedUser.username}`,
      { headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify()
      }
    )
    setIsInFlock(false)
  }

  //fetch users posts to pass to ChirpList && fetch displayed users information
  useEffect(() => {
    fetch(`http://localhost:9292/user/${userName}/posts`)
    .then(res => res.json())
    .then(obj => {
      setList(obj)
    })

    fetch(`http://localhost:9292/user/${userName}`)
    .then(res => res.json())
    .then(obj => {
      setDisplayedUser(obj)
    })

    fetch(`http://localhost:9292/flock/${globalState.username}/add/${userName}`)
    .then(res => res.json())
    .then(obj => setIsInFlock(obj))
  },[])

  return (
    // is user logged in?
    globalState.isLoggedIn?
    <>
      {/* logged in  */}
      <Header />
      <Nav/>

      {/* banner */}
      <div>

        {/* banner image  */}
        <img src={displayedUser.pfpURL}></img>

        {/* add to flock conditional */}
        {showAddToFlock? <>
          {isInFlock? <button onClick={handleRemoveFromFlock} class="bg-purple hover:bg-green text-white font-bold py-2 px-6 rounded-full text-lg" >Remove From Flock</button> : <button onClick={handleAddToFlock} class="bg-purple hover:bg-green text-white font-bold py-2 px-6 rounded-full text-lg">Add To Your Flock</button>}
        </> : null
        }

      </div>

      {/* show create chirp logic */}
      {showAddChirp? <>
        <div class="font-proza-libre text-6xl font-bold text-center text-purple p-4">
          <h1>Create a Chirp</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <div class="font-proza-libre text-purple">
              <input
                name="content"
                value={formData.content}
                onChange={handleChange}
                type="textarea"
                id="chirp"
                placeholder=" Add chirp content"
                class="h-32 w-96 rounded m-5 mx-1 text-xl bg-green border border-purple"
              />
        </div>

        <div class="font font-proza-libre flex flex-col items-center">
          <button
            type="submit"
            id="submitChirp"
            class="bg-purple hover:bg-green text-white font-bold py-2 px-6 rounded-full text-lg"
            >Chirp
          </button>
        </div>
        </form> 
      </>
      : null
      }

      {/* display users chirps */}
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
      <NavLink to="/"><button>Login</button></NavLink>
    </>
  )
}
