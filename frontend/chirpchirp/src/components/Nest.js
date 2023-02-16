import {React, useEffect, useState} from 'react'
import Nav from './Nav'
import Header from './Header'
import ChirpList from './ChirpList'

export default function Nest() {

  const [list, setList] = useState([])

  useEffect(() =>{
    fetch(`http://localhost:9292/posts`)
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
          <h1 class="text-5xl font-bold p-4">Chirps</h1>
        </div>
        <div class="flex flex-wrap justify-center p-4">
          <ChirpList list={list}/>
        </div>
    </div>
  )
}

