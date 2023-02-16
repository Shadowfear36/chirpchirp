import React from 'react'
import Chirp from './Chirp.js'

export default function ChirpList({ list }) {
    const displayChirps = list.map((chirp) => {
    return  <Chirp
      content={chirp.content}
      likes={chirp.likes}
      userId={chirp.userId}
      createdAt={chirp.created_at}
      username={chirp.username}
      pfp={chirp.pfpURL}
      chirpId={chirp.id}
      />
    })
  return (
    <div>{displayChirps}</div>
  )
}
