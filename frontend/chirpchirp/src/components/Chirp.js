import React from 'react'


export default function Chirp({content, likes, userId, createdAt, username, pfp, chirpId}) {
  const handleLike = (e) => {
    e.preventDefault();
    let newlikes = likes + 1;
    fetch(`http://localhost:9292/posts/${chirpId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        "likes": newlikes
      })
    })
    .then(res => res.json())
    .then(obj => likes = obj.likes)
  }

  const handleComment = (e) => {
    e.preventDefault();
    //pop up a form to make a comment
    //post comment to database
  }

  return (
    <div>
      <p>{createdAt}</p>
      <div>
        {/* Individual Chirp */}
        <img src={pfp}/>
        <p>User: {username}</p>

        <p>{content}</p>
        <p>Likes: {likes}</p>
        <button onClick={handleLike}>Like</button>
        <button onClick={handleComment}>Comment</button>
      </div>
    </div>
  )
}
