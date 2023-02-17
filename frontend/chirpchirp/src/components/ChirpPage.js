import { React, useEffect, useState, useContext } from 'react'
import Nav from './Nav'
import Header from './Header'
import ChirpList from './ChirpList'
import Chirp from './Chirp'
import { GlobalContext } from '../context/user.js'
import { useParams } from "react-router-dom";


export default function ChirpPage() {

  //pull params information from url
  const { chirpId } = useParams();

  // initialize Global Context
  const globalState = useContext(GlobalContext);

  // chirp at hand state
  const [chirp, setChirp] = useState([])

  //chirp comments list
  const [list, setList] = useState([])

  // fetch post
  useEffect(() => {
    fetch(`http://localhost:9292/posts/${chirpId}`)
    .then(res => res.json())
    .then(obj => setChirp(obj))
  },[]);

  // fetch posts comments
  useEffect(() => {
    fetch(`http://localhost:9292/posts/${chirpId}/comments`)
    .then(res => res.json())
    .then(obj => setList(obj))
  },[]);

  return (
  <div>
    <div>
        <Header/>
        <Nav/>
    </div>
    <h1 class="font-proza-libre form-label inline-block mb-5 text-3xl max-w-md text-purple p-4">Chirp</h1>
    <div class="flex flex-wrap justify-center p-4">
      <Chirp content={chirp.content} likes={chirp.likes} createdAt={chirp.created_at} username={chirp.username} pfp={chirp.pfpURL} chirpId={chirp.id}/>
    </div>
    <br/>
    <br/>
    <div>
    <p class="font-proza-libre form-label inline-block mb-5 text-3xl max-w-md text-purple">Chirp Comments</p>
    </div>
    <div class="flex flex-wrap justify-center p-4">
    <ChirpList list={list}/>
    </div>
  </div>
  
  )
}
