"use client"

import { useState, useEffect } from 'react'
import Card from './Card'

const PostCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16'>
      {
        data.map(post => (
          <Card {...post} key={post._id} />
        )) 
      }
    </div>
  )
}
const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState([])
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("api/post")
      const data = await response.json()
      setPosts(data)
    }
    fetchPosts()

  }, [])
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type='text' placeholder='Search for tag or a username' 
        required 
        value={searchText}
        onChange={handleSearchChange}
        className='form_input mt-5 peer'
        />
      </form>

      <PostCardList data={posts} handleTagClick={() => {}}>
      
      </PostCardList>
    </section>
  )
}

export default Feed