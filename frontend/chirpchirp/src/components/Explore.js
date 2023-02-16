import {React, useEffect, useState} from 'react'
import Nav from './Nav'
import Header from './Header'
import ChirpList from './ChirpList'

export default function Explore() {

  const [list, setList] = useState([])

  const initialFormData = {
    search: ""
  }

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9292/posts/search/${formData.search}`)
    .then((res) => res.json())
    .then((obj) => setList(obj))
  }

  useEffect(() =>{
    fetch(`http://localhost:9292/trending`)
    .then(res => res.json())
    .then(obj => setList(obj))
  },[])

  return (
    <div>
      <div>
        <Header/>
        <Nav/>
      </div>
      <div class="font-proza-libre text-purple">
        <h1 class="text-5xl font-bold p-4">Explore</h1>
        <div class="flex justify-center">
          <div class="mb-3 xl:w-96">
            <form onSubmit={handleSubmit}>
              <label class="form-label inline-block mb-2 text-2xl">Search for Chirps</label>
              <input
                  name="search"
                  value={formData.search}
                  onChange={handleChange}
                  type="search"
                  id="searchChirp"
                  placeholder="Search for Chirps"
                  class="w-full mr-3 py-5 px-4 h-2 border border-purple rounded mb-2 bg-green"
              />
              <button
                class="bg-purple hover:bg-green text-white font-bold py-2 px-6 rounded-full text-lg m-2"
                >Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap justify-center p-4">
        {/* display chirps */}
        <ChirpList list={list}/>
      </div>
    </div>
  )
}
