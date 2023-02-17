import { React, useEffect, useState, useContext } from 'react'
import Nav from './Nav'
import Header from './Header'
import ChirpList from './ChirpList'
import { GlobalContext } from '../context/user.js'
import { useNavigate } from "react-router-dom";



export default function Flock() {

  // initialize Global Context
  const globalState = useContext(GlobalContext);

  //allow for navigation
  const navigate = useNavigate();

  //state of chirp list
  const [list, setList] = useState([]);

  //initial form state
  const initialState = {
    search: ""
  }
  //form state
  const [formData, setFormData] = useState(initialState);

  //fetch friends posts and your posts
  useEffect(() => {

    fetch(`http://localhost:9292/user/${globalState.username}/flock/posts`)
    .then(res => res.json())
    .then(
      data => {
        setList(data.flat())
      }
    )
  },[])

    // handle form input Change
    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate(`/${formData.search}`)
    }

  return (
    <div>
      <div>
        <Header/>
        <Nav/>
      </div>
      <div class="font-proza-libre text-purple">
        <h1 class="text-5xl font-bold py-4">Flock</h1>
        <div class="flex justify-center">
          <div class="mb-3 xl:w-96">
            <form onSubmit={handleSubmit}>
            <label class="form-label inline-block mb-5 text-2xl max-w-md">Add To Your Flock</label>
              <input
                  onChange={handleChange}
                  name="search"
                  type="search"
                  id="addToFlock"
                  placeholder="Search For Chirpers"
                  class="w-full mr-3 py-5 px-4 h-2 border border-purple rounded mb-2 bg-green"
              />
              <button
                type="submit"
                class="bg-purple hover:bg-green text-white font-bold py-2 px-6 rounded-full text-lg m-2"
                >Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <p class="font-proza-libre text-purple text-lg">Your Flocks Posts</p>
      <div class="flex flex-wrap justify-center p-4">
        <ChirpList list={list}/>
      </div>
      </div>
    </div>
  )
}
