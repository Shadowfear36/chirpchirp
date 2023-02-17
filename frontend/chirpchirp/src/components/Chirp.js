import { React, useState, useContext }  from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { GlobalContext } from '../context/user.js'

export default function Chirp({content, likes, userId, createdAt, username, pfp, chirpId}) {

 // initialize Global Context
 const globalState = useContext(GlobalContext);

 //state of current likes
const [currentLikes, setCurrentLikes] = useState(likes)

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
    .then(obj => setCurrentLikes(obj.likes))
  }
  //state for displaying add comment
  const [showAddComment, setShowAddComment] = useState(false);
  // handle showing add comment upon click of add comment button
  const handleAddComment = (e) => {
    e.preventDefault();
    //pop up a form to make a comment
    setShowAddComment(true);
  }

  //initial comment form state
  const initialCommentState = {
    comment: "",
    likes: 0,
    user_id: globalState.userId
  }
  //comment form state
  const [formData, setFormData] = useState(initialCommentState);

  //handle change of comment input state
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  //handle submit of comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9292/posts/${chirpId}/comments/add`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(obj => console.log(obj))
    .then(() => {
      alert("Comment Submitted");
      setShowAddComment(false);
    })
  };

  // link for specific chirp
  const chirpLink = `/chirp/${chirpId}`

  //link for viewing a user
  const userLink = `/${username}`
 

  return (
    <div class="block max-w-sm p-6 border border-purple rounded-lg shadow font-proza-libre text-purple bg-green space-y-5 mb-5">
      <div>
        <NavLink to={userLink}>
        <img 
          class="h-10"
          src={pfp}
        />
        </NavLink>
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
        <p>Likes ♡: {currentLikes}</p>
      </div>
      <div>
        <button 
          onClick={handleLike}
          class="bg-purple hover:bg-blue text-white font-bold py-2 px-3  rounded-full text-md m-2 p-4"
          >Like Post ♡
        </button>
        <div>
          <button
            onClick={handleAddComment}
            class="bg-purple hover:bg-blue text-white font-bold py-2 px-3  rounded-full text-md m-2 p-4"
            >Add Comment
          </button>
          <NavLink to={chirpLink}>
            <button 
            class="bg-purple hover:bg-blue text-white font-bold py-2 px-3  rounded-full text-md m-2 p-4"
            >View Comments
            </button>
          </NavLink>
          {/* add comment form */}
          {showAddComment? 
          <form onSubmit={handleCommentSubmit}>
            <input name="comment" type="text" value={formData.comment} onChange={handleChange}/>
            <button
            type="submit"
            class="bg-purple hover:bg-blue text-white font-bold py-2 px-3  rounded-full text-md m-2 p-4"
            >Submit Comment</button>
          </form> : null
        }
        </div>
      </div>
    </div>
  )
}
