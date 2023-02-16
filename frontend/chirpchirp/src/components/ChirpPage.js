import { React, useEffect, useState, useContext } from 'react'
import Nav from './Nav'
import Header from './Header'
import ChirpList from './ChirpList'
import Chirp from './Chirp'
import { GlobalContext } from '../context/user.js'
import { useParams } from "react-router-dom";


export default function ChirpPage() {

  //pull params information from url
  let {chirpId} = useParams();

  // initialize Global Context
  const globalState = useContext(GlobalContext);
  
  // chirp at hand state
  const [chirp, setChirp] = useState([])

  //chirp comments list
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`http://localhost:9292/posts/${chirpId}`)
    .then(res => res.json())
    .then(obj => setChirp(obj))
  },[]);

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
    <div>
      <Chirp content={chirp.content} likes={chirp.likes} createdAt={chirp.created_at} username={chirp.username} pfp={chirp.pfpURL} chirpId={chirp.id}/>
    </div>
    <br/>
    <p>|</p>
    <p>|</p>
    <br/>
    <p>Chirp Comments</p>
    <ChirpList list={list}/>
  </div>
  )
}
