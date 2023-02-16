import { React }  from 'react'


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
    <div class="block max-w-sm p-6 border border-purple rounded-lg shadow font-proza-libre text-purple bg-green space-y-5 mb-5">
      <div >
        <img 
          class="h-10"
          src={pfp}
        />
      </div>
      <div>
        <p>{content}</p>
      </div>
      <div>
        <p>Created on: {createdAt}</p>
      </div>
      <div>
        <p >Created by: {username}</p>
      </div>
      <div>
        <p>Likes ♡: {likes}</p>
      </div>
      <div>
        <button 
          onClick={handleLike}
          class="bg-purple hover:bg-blue text-white font-bold py-2 px-3  rounded-full text-md m-2 p-4"
          >Like Post ♡
        </button>
        <div>
          <button
            onClick={handleComment}
            class="bg-purple hover:bg-blue text-white font-bold py-2 px-3  rounded-full text-md m-2 p-4"
            >Add Comment
          </button>
        </div>
      </div>
    </div>
  )
}
